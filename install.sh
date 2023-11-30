. ./environment.sh

# Create the resource group
echo "Creating the resource group $RESOURCE_GROUP"
az group create --resource-group $RESOURCE_GROUP --location $LOCATION
