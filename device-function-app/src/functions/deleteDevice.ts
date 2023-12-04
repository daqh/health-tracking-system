import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const deviceId = Number(request.params.deviceId);

    const device = await prisma.device.delete({
      where: {
        id: deviceId,
      },
    });

    return {
      status: 200,
      jsonBody: device,
    };
  } catch (error) {
    switch (error.code) {
      case "P2025":
        return {
          status: 404,
          jsonBody: {
            message: `Device with id ${request.params.deviceId} not found`,
          }
        };
      default:
        return {
          status: 500,
          jsonBody: {
            message: error.message,
          },
        };
    }
  }
}

app.http("deleteDevice", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: deleteDevice,
  route: "device/{deviceId}",
});
