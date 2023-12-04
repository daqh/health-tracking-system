import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findDevices(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const devices = await prisma.device.findMany({
    include: {
      DeviceType: true,
    },
  });

  return {
    status: 200,
    jsonBody: {
      devices: devices,
    },
  };
}

app.http("findDevices", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: findDevices,
  route: "device",
});