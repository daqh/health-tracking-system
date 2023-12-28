var iothub = require('azure-iothub');

const connectionString = process.env.IOTHUB_CONNECTION_STRING;

const registry = iothub.Registry.fromConnectionString(connectionString);

export default registry;
