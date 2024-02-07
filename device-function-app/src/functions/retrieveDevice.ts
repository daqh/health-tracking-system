import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import registry from "../utils/iothub";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";
import moment = require("moment");

const prisma = new PrismaClient();

export async function retrieveDevice(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const payload = decode(token);
  const sub = payload["sub"] as string;

  let begin: any = request.query.get("begin");
  begin = moment(begin, "YYYY-MM-DD");

  if (!begin.isValid()) {
    var prismaDevice = await prisma.device.findUnique({
      where: {
        id: parseInt(request.params.id),
        AND: {
          sub: sub,
        },
      },
      include: {
        measures: {
          orderBy: {
            datetime: "asc",
          },
        },
      },
    });
  } else {
    var prismaDevice = await prisma.device.findUnique({
      where: {
        id: parseInt(request.params.id),
        AND: {
          sub: sub,
        },
      },
      include: {
        measures: {
          orderBy: {
            datetime: "asc",
          },
          where: {
            datetime: {
              gte: begin.toDate(),
            },
          },
        },
      },
    });
  }

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
