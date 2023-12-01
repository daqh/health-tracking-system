# Description: This file contains the environment variables used by the scripts
echo "Setting up the environment variables"

# Define the variables
PROJECT_NAME="my-project"
LOCATION="italynorth"
RESOURCE_GROUP_SUFFIX="resource-group"

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# BEGIN: SQL Server variables
SQL_SERVR_SUFFIX="sql-server"
SQL_DATABASE_SUFFIX="database"
SQL_SHADOW_DATABASE_SUFFIX="shadow"
# ++++ CHANGE THESE VALUES ++++
SQL_SERVER_ADMIN="sqladmin"
SQL_SERVER_PASSWORD="P@ssw0rd"
# END: SQL Server variables

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# BEGIN: DO NOT MODIFY
RESOURCE_GROUP="$PROJECT_NAME-$RESOURCE_GROUP_SUFFIX"
SQL_SERVER="$PROJECT_NAME-$SQL_SERVR_SUFFIX"
SQL_DATABASE="$PROJECT_NAME-$SQL_DATABASE_SUFFIX"
SQL_SHADOW_DATABASE="$PROJECT_NAME-$SQL_DATABASE_SUFFIX-$SQL_SHADOW_DATABASE_SUFFIX"

# Database URL for Prisma ORM and provider sqlserver (https://www.prisma.io/docs/reference/database-reference/connection-urls)
DATABASE_URL="sqlserver://$SQL_SERVER.database.windows.net:1433;database=$SQL_DATABASE;user=$SQL_SERVER_ADMIN;password=$SQL_SERVER_PASSWORD"
SHADOW_DATABASE_URL="sqlserver://$SQL_SERVER.database.windows.net:1433;database=$SQL_SHADOW_DATABASE;user=$SQL_SERVER_ADMIN;password=$SQL_SERVER_PASSWORD"
# END: DO NOT MODIFY

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
