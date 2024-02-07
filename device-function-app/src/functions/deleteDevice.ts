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

export async function deleteDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const sub = payload['sub'] as string;
  try {
    const deviceId = Number(request.params.deviceId);

    const prismaDevice = await prisma.device.delete({
      where: {
        id: deviceId,
        AND: {
          sub: sub,
        },
      },
    });

    await registry.delete(deviceId.toString());

    return {
      status: 200,
      jsonBody: prismaDevice,
    };
  } catch (error) {
    switch (error.code) {
      case "P2025":
        return {
          status: 404,
          jsonBody: {
            message: `Device with id ${request.params.deviceId} not found`,
          },
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
