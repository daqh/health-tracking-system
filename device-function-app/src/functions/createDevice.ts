import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { Device } from "../models/Device";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const json: any = await request.json();

    const device = await prisma.device.create({
      data: new Device(json.connectionString, json.deviceTypeId),
      include: {
        DeviceType: true,
      },
    });

    return {
      jsonBody: device,
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