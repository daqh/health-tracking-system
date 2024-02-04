import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import registry from "../utils/iothub";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function findDevices(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const oid = payload['oid'];

  const prismaDevices = await prisma.device.findMany({
    where: {
      oid: oid,
    },
  });

  const registryDevices = (await registry.list()).responseBody;

  const devices = prismaDevices.map((prismaDevice) => {
    const registryDevice = registryDevices.find(
      (registryDevice) => registryDevice.deviceId === prismaDevice.id.toString()
    );

    return {
      prismaDevice,
      registryDevice,
    };
  });

  return {
    status: 200,
    jsonBody: devices,
  };
}

app.http("findDevices", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [],
  handler: findDevices,
  route: "device",
});
