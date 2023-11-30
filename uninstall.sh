. ./environment.sh

# Delete the resource group
echo "Deleting the resource group $RESOURCE_GROUP"
az group delete --resource-group $RESOURCE_GROUP --yes
