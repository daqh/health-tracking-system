import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { Device } from "../models/Device";

import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

import registry from "../utils/iothub";

const prisma = new PrismaClient();

export async function createDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const oid = payload['oid'];
  try {
    const json: any = await request.json();

    const deviceTypeId = Number(json.deviceTypeId);

    const prismaDevice = await prisma.device.create({
      data: new Device(deviceTypeId, oid),
    });

    const registryDevice = (
      await registry.create({
        deviceId: prismaDevice.id.toString(),
      })
    ).responseBody;

    await registry.updateTwin(prismaDevice.id.toString(), {
      tags: {
        deviceTypeId: deviceTypeId.toString(),
        oid: oid,
      },
    }, "*");

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
