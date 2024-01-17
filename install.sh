. ./environment.sh

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
    az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --start-ip-address $GLOBAL_IP --end-ip-address $GLOBAL_IP --name "AllowMyIP"
fi

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
echo -e '\tiotHubHostName: "$IOT_HUB.azure-devices.net",' >> ng-hts/src/environment/environment.prod.ts

# END: Azure IoT Hub
# =========================
# .........................
# =========================
# BEGIN: Azure Functions

echo "Creating the storage account $STORAGE_ACCOUNT"
az storage account create --name $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --location $LOCATION --sku Standard_LRS --kind StorageV2

az resource create --resource-type "Microsoft.Insights/components" --name $APPINSIGHTS_NAME --resource-group $RESOURCE_GROUP --location westeurope --properties '{"Application_Type":"web"}'

echo "Creating the function app $FUNCTION_APP"
az functionapp create --name $FUNCTION_APP --storage-account $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --consumption-plan-location westeurope --runtime node --runtime-version 20 --functions-version 4 --os-type Linux --app-insights $APPINSIGHTS_NAME
echo -e '\tapiBaseUrl: "https://$FUNCTION_APP.azurewebsites.net/api",' >> ng-hts/src/environment/environment.prod.ts

# END: Azure Functions
# =========================
# .........................
# =========================
# BEGIN: Azure Stream Analytics Job

# az stream-analytics job create --name $STREAM_ANALYTICS_JOB --resource-group $RESOURCE_GROUP --transformation name="transformationSAJ" streaming-units=1

# END: Azure Stream Analytics Job
# =========================
# .........................
# =========================
# BEGIN: Azure Static Web App

az staticwebapp create --name $STATIC_WEB_APP --resource-group $RESOURCE_GROUP
echo "Creating the static web app $STATIC_WEB_APP to the environment $STATIC_WEB_APP_ENV"
swa deploy --resource-group my-project-resource-group --app-name my-project-static-web-app --env $STATIC_WEB_APP_ENV

# =========================
# .........................
# =========================
# Begin: Deploy the function app

cd device-function-app
npx prisma generate # Generate the Prisma client
npx prisma db push
func azure functionapp publish $FUNCTION_APP # Deploy the function app
cd ..

# End: Deploy the function app
# =========================

echo } >> ng-hts/src/environment/environment.prod.ts