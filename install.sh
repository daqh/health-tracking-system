. ./environment.sh

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

# Create the firewall rule to allow your IP
echo "Creating the firewall rule to allow your IP"
az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --start-ip-address $GLOBAL_IP --end-ip-address $GLOBAL_IP --name "AllowMyIP"

# Create the database
echo "Creating the database $SQL_DATABASE"
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_DATABASE --free-limit true --free-limit-exhaustion-behavior AutoPause --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1

# Create the shadow database (needed by Prisma ORM during migrations)
#echo "Creating the shadow database $SQL_SHADOW_DATABASE"
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_SHADOW_DATABASE --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1 --zone-redundant false

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

cd device-function-app
npx prisma generate # Generate the Prisma client
func azure functionapp publish my-project-function-app # Deploy the function app
cd ..

# END: Azure Functions
# =========================

