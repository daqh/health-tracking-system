import { Registry } from 'azure-iothub';

const connectionString = process.env.IOT_HUB_CONNECTION_STRING;

console.log(connectionString);

const registry = Registry.fromConnectionString(connectionString);

export default registry;
