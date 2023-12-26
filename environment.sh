# Description: This file contains the environment variables used by the scripts
echo "Setting up the environment variables"

# Define the variables
PROJECT_NAME="my-project"
SAFE_PROJECT_NAME="htsproject"
LOCATION="italynorth"
RESOURCE_GROUP_SUFFIX="resource-group"
GLOBAL_IP="<>"
DEVELOPMENT="false" # Set to "true" if you want to create the shadow database

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# BEGIN: SQL Server variables
SQL_SERVR_SUFFIX="sql-server"
SQL_DATABASE_SUFFIX="database"
SQL_SHADOW_DATABASE_SUFFIX="shadow"
# ++++ CHANGE THESE VALUES ++++
SQL_SERVER_ADMIN="<>"
SQL_SERVER_PASSWORD="<>"
# END: SQL Server variables
# ..........................
# BEGIN: IoT Hub variables
IOT_HUB_SUFFIX="iot-hub"
# END: IoT Hub variables
# ..........................
# BEGIN: Functions variables
STORAGE_ACCOUNT_SUFFIX="storageaccount"
FUNCTION_APP_SUFFIX="function-app"
APPINSIGHTS_SUFFIX="app-insights"
# END: Functions variables
# Begin: Stream Analytics Job variables
STREAM_ANALYTICS_JOB_SUFFIX="stream-analytics-job"
# END: Stream Analytics Job variables
STATIC_WEB_APP_SUFFIX="static-web-app"

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# BEGIN: DO NOT MODIFY
RESOURCE_GROUP="$PROJECT_NAME-$RESOURCE_GROUP_SUFFIX"
SQL_SERVER="$PROJECT_NAME-$SQL_SERVR_SUFFIX"
SQL_DATABASE="$PROJECT_NAME-$SQL_DATABASE_SUFFIX"
SQL_SHADOW_DATABASE="$PROJECT_NAME-$SQL_DATABASE_SUFFIX-$SQL_SHADOW_DATABASE_SUFFIX"
IOT_HUB="$PROJECT_NAME-$IOT_HUB_SUFFIX"
STORAGE_ACCOUNT="$SAFE_PROJECT_NAME$STORAGE_ACCOUNT_SUFFIX"
FUNCTION_APP="$PROJECT_NAME-$FUNCTION_APP_SUFFIX"
APPINSIGHTS_NAME="$PROJECT_NAME-$APPINSIGHTS_SUFFIX"
STREAM_ANALYTICS_JOB="$PROJECT_NAME-$STREAM_ANALYTICS_JOB_SUFFIX"
STATIC_WEB_APP="$PROJECT_NAME-$STATIC_WEB_APP_SUFFIX"

# Database URL for Prisma ORM and provider sqlserver (https://www.prisma.io/docs/reference/database-reference/connection-urls)
DATABASE_URL="sqlserver://$SQL_SERVER.database.windows.net:1433;database=$SQL_DATABASE;user=$SQL_SERVER_ADMIN;password=$SQL_SERVER_PASSWORD"
SHADOW_DATABASE_URL="sqlserver://$SQL_SERVER.database.windows.net:1433;database=$SQL_SHADOW_DATABASE;user=$SQL_SERVER_ADMIN;password=$SQL_SERVER_PASSWORD"
# END: DO NOT MODIFY

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

if [ "$DEVELOPMENT" = "true" ]; then
    $STATIC_WEB_APP_ENV="preview"
else
    $STATIC_WEB_APP_ENV="production"
fi