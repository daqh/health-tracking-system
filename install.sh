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
az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --start-ip-address "151.75.9.95" --end-ip-address "151.75.9.95" --name "AllowMyIP"

# Create the database
echo "Creating the database $SQL_DATABASE"
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_DATABASE --free-limit true --free-limit-exhaustion-behavior AutoPause --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1

# Create the shadow database (needed by Prisma ORM during migrations)
echo "Creating the shadow database $SQL_SHADOW_DATABASE"
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_SHADOW_DATABASE --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1 --zone-redundant false

echo "" > .env
echo "DATABASE_URL=\"$DATABASE_URL\"" >> .env
echo "SHADOW_DATABASE_URL=\"$SHADOW_DATABASE_URL\"" >> .env

# END: Azure SQL Database
# =========================
