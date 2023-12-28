import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findDeviceType(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const deviceTypes = await prisma.deviceType.findMany();

  return {
    status: 200,
    jsonBody: deviceTypes,
  };
}

app.http("findDeviceType", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: findDeviceType,
  route: "device-type",
});
