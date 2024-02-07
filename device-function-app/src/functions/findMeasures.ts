import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";
import * as moment from "moment";

const prisma = new PrismaClient();

export async function findMeasures(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const payload = decode(token);
  const sub = payload["sub"] as string;

  let begin: any = request.query.get("begin");
  begin = moment(begin, "YYYY-MM-DD");

  if(!begin.isValid()) {
    var measures = await prisma.measure.findMany({
      where: {
        device: {
          sub: sub,
        },
      },
    });
  } else {
    var measures = await prisma.measure.findMany({
      orderBy: {
        datetime: "asc",
      },
      where: {
        datetime: {
          gte: begin.toDate(),
        },
        device: {
          sub: sub,
        },
      },
    });
  }

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
