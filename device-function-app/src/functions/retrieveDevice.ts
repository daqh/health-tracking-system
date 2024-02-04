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

export async function retrieveDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const payload = decode(token);
  const oid = payload["oid"];

  const prismaDevice = await prisma.device.findUnique({
    where: {
      id: parseInt(request.params.id),
    },
    include: {
      measures: true,
    },
  });

  const registryDevice = (await registry.get(request.params.id)).responseBody;

  const device = {
    prismaDevice,
    registryDevice,
  };

  return {
    status: 200,
    jsonBody: device,
  };
}

app.http("retrieveDevice", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [],
  handler: retrieveDevice,
  route: "device/{id:int}",
});
