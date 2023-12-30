import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { Device } from "../models/Device";

import { PrismaClient } from "@prisma/client";

import registry from "../utils/iothub";

const prisma = new PrismaClient();

export async function createDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const json: any = await request.json();

    const deviceTypeId = Number(json.deviceTypeId);

    const prismaDevice = await prisma.device.create({
      data: new Device(deviceTypeId),
      include: {
        deviceType: true,
      },
    });

    const registryDevice = (
      await registry.create({
        deviceId: prismaDevice.id.toString(),
      })
    ).responseBody;

    return {
      jsonBody: {
        prismaDevice,
        registryDevice,
      },
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: error.message,
      },
    };
  }
}

app.http("createDevice", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createDevice,
  route: "device",
});
