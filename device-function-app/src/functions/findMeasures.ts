import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function findMeasures(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const payload = decode(token);
  const oid = payload["oid"];

  const measures = await prisma.measure.findMany({
    where: {
      device: {
        oid: oid,
      },
    },
  });

  return {
    status: 200,
    jsonBody: measures,
  };
}

app.http("findMeasures", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [],
  handler: findMeasures,
  route: "measure",
});
