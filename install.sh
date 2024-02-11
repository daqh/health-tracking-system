. ./environment.sh

az extension add --name front-door

echo "export const environment = {" > ng-hts/src/environment/environment.prod.ts
echo -e "\tproduction: true," >> ng-hts/src/environment/environment.prod.ts

# Create the resource group
echo "Creating the resource group $RESOURCE_GROUP"
az group create --resource-group $RESOURCE_GROUP --location $LOCATION

# =========================
# BEGIN: Azure SQL Database

# Create the SQL Server
echo "Creating the SQL Server $SQL_SERVER"
az sql server create --location $LOCATION --resource-group $RESOURCE_GROUP --name $SQL_SERVER --admin-user $SQL_SERVER_ADMIN --admin-password $SQL_SERVER_PASSWORD

# Create the firewall rule to allow all Azure IPs
echo "Creating the firewall rule to allow all Azure IPs"
az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --start-ip-address "0.0.0.0" --end-ip-address "0.0.0.0" --name "AllowAllAzureIPs"

if [ "$DEVELOPMENT" = "true" ]; then
    # Create the firewall rule to allow your IP
    echo "Creating the firewall rule to allow your IP"
fi
az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --start-ip-address $GLOBAL_IP --end-ip-address $GLOBAL_IP --name "AllowMyIP"

# Create the database
echo "Creating the database $SQL_DATABASE"
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_DATABASE --free-limit true --free-limit-exhaustion-behavior AutoPause --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1

# Create the shadow database (needed by Prisma ORM during migrations)
# ONLY FOR DEVELOPMENT
if [ "$DEVELOPMENT" = "true" ]; then
    echo "Creating the shadow database $SQL_SHADOW_DATABASE"
    az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_SHADOW_DATABASE --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1 --zone-redundant false
fi

# Generate the .env file for the device-function-app
echo "" > device-function-app/.env
echo "DATABASE_URL=\"$DATABASE_URL\"" >> device-function-app/.env
echo "SHADOW_DATABASE_URL=\"$SHADOW_DATABASE_URL\"" >> device-function-app/.env

# END: Azure SQL Database
# =========================
# .........................
# =========================
# BEGIN: Azure IoT Hub

echo "Creating the IoT Hub $IOT_HUB"
az iot hub create -n $IOT_HUB --resource-group $RESOURCE_GROUP --sku F1 --partition-count 2 --location westeurope # F1 sku allows free 500 devices and 8000 messages per day
echo IOT_HUB_CONNECTION_STRING="$( az iot hub connection-string show --hub-name $IOT_HUB --resource-group $RESOURCE_GROUP | jq '.connectionString' )" >> device-function-app/.env
echo -e "\tiotHubHostName:" "\""$IOT_HUB.azure-devices.net"\"", >> ng-hts/src/environment/environment.prod.ts

cat device-function-app/.env >> meal-function-app/.env # Copy the .env file to the meal-function-app

# END: Azure IoT Hub
# =========================
# .........................
# =========================
# BEGIN: Azure Functions

echo "Creating the storage account $STORAGE_ACCOUNT"
az storage account create --name $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --location $LOCATION --sku Standard_LRS --kind StorageV2

az resource create --resource-type "Microsoft.Insights/components" --name $APPINSIGHTS_NAME --resource-group $RESOURCE_GROUP --location westeurope --properties '{"Application_Type":"web"}'

echo "Creating the device function app $DEVICE_FUNCTION_APP"
az functionapp create --name $DEVICE_FUNCTION_APP --storage-account $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --consumption-plan-location westeurope --runtime node --runtime-version 20 --functions-version 4 --os-type Linux --app-insights $APPINSIGHTS_NAME
echo -e "\tdeviceApiBaseUrl:" "\""https://$DEVICE_FUNCTION_APP.azurewebsites.net/api"\"", >> ng-hts/src/environment/environment.prod.ts
az functionapp cors add  --name $DEVICE_FUNCTION_APP --allowed-origins "*" --resource-group $RESOURCE_GROUP

echo "Creating the device function app $MEAL_FUNCTION_APP"
az functionapp create --name $MEAL_FUNCTION_APP --storage-account $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --consumption-plan-location westeurope --runtime node --runtime-version 20 --functions-version 4 --os-type Linux --app-insights $APPINSIGHTS_NAME
echo -e "\tmealApiBaseUrl:" "\""https://$MEAL_FUNCTION_APP.azurewebsites.net/api"\"", >> ng-hts/src/environment/environment.prod.ts
az functionapp cors add  --name $MEAL_FUNCTION_APP --allowed-origins "*" --resource-group $RESOURCE_GROUP

# END: Azure Functions
# =========================
# .........................
# =========================
# BEGIN: Azure Stream Analytics Job

az stream-analytics job create --name $STREAM_ANALYTICS_JOB --resource-group $RESOURCE_GROUP --transformation name="transformationSAJ" streaming-units=1 query="$STREAM_ANALYTICS_JOB_QUERY"

SAJ_INPUT_PROPERTIES="\
{ 
    \"type\": \"Stream\", 
    \"datasource\": { 
        \"type\": \"Microsoft.Devices/IotHubs\", 
        \"properties\": {
            \"endpoint\": \"messages/events\",
            \"iotHubNamespace\": \"$IOT_HUB\", 
            \"sharedAccessPolicyName\": \"service\", 
            \"sharedAccessPolicyKey\": \"$( az iot hub policy show --hub-name $IOT_HUB --name service | jq -r '.primaryKey' )\", 
            \"consumerGroupName\": \"\$Default\"
        }
    },
    \"serialization\": { 
        \"type\": \"Json\", 
        \"properties\": { 
            \"encoding\": \"UTF8\"
        }
    }
}"

az stream-analytics input create --name $IOT_HUB --job-name $STREAM_ANALYTICS_JOB --resource-group $RESOURCE_GROUP --properties "$SAJ_INPUT_PROPERTIES"

SAJ_OUTPUT_DATASOURCE="\
{ 
    \"type\": \"Microsoft.Sql/Server/Database\", 
    \"properties\": { 
        \"server\": \"$SQL_SERVER\", 
        \"database\": \"$SQL_DATABASE\", 
        \"user\": \"$SQL_SERVER_ADMIN\", 
        \"password\": \"$SQL_SERVER_PASSWORD\", 
        \"table\": \"Measure\" 
    }
}"

az stream-analytics output create --name $SQL_DATABASE --job-name $STREAM_ANALYTICS_JOB --resource-group $RESOURCE_GROUP --datasource "$SAJ_OUTPUT_DATASOURCE"

# END: Azure Stream Analytics Job
# =========================
# .........................
# =========================
# BEGIN: Azure Static Web App

az staticwebapp create --name $STATIC_WEB_APP --resource-group $RESOURCE_GROUP
echo -e "\tmsal: {" >> ng-hts/src/environment/environment.prod.ts
echo -e "\t\tredirectUri:" "\"https://"$(az staticwebapp list | jq -r '.[0].defaultHostname')"\"", >> ng-hts/src/environment/environment.prod.ts

echo -e "\t\tclientId:" "\""$MSAL_CLIENT_ID"\"", >> ng-hts/src/environment/environment.prod.ts
echo -e "\t\tauthority:" "\""$MSAL_AUTHORITY"\"", >> ng-hts/src/environment/environment.prod.ts
echo -e "\t\tknownAuthorities:" "[\""$MSAL_KNOWN_AUTHORITY"\"]", >> ng-hts/src/environment/environment.prod.ts

echo -e "\t}," >> ng-hts/src/environment/environment.prod.ts
echo "Creating the static web app $STATIC_WEB_APP to the environment $STATIC_WEB_APP_ENV"

echo -e "\tipinfoToken:" "\""$IPINFO_TOKEN"\"", >> ng-hts/src/environment/environment.prod.ts
echo } >> ng-hts/src/environment/environment.prod.ts
cd ng-hts
npm install
ng build --configuration production
cd ..
swa deploy --resource-group my-project-resource-group --app-name my-project-static-web-app --env $STATIC_WEB_APP_ENV

# =========================
# .........................
# =========================
# Begin: Deploy the function app

cd device-function-app
npx prisma generate # Generate the Prisma client
npx prisma db push
func azure functionapp publish $DEVICE_FUNCTION_APP # Deploy the function app
cd ..

cd meal-function-app
npx prisma generate # Generate the Prisma client
func azure functionapp publish $MEAL_FUNCTION_APP # Deploy the function app
cd ..

if [ "$DEVELOPMENT" = "false" ]; then
    az sql server firewall-rule delete --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name "AllowMyIP" # Delete the firewall rule to allow your IP
fi

# End: Deploy the function app
# =========================

az stream-analytics job start --name $STREAM_ANALYTICS_JOB --resource-group $RESOURCE_GROUP
