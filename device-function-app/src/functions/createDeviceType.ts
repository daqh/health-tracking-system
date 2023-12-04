import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { DeviceType } from "../models/DeviceType";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDeviceType(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const json: any = await request.json();

    const deviceType = await prisma.deviceType.create({
      data: new DeviceType(json.name),
    });

    return {
      jsonBody: deviceType,
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

app.http("createDeviceType", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createDeviceType,
  route: "device-type",
});
