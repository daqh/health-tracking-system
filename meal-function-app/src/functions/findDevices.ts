import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function findMeals(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const sub = payload['sub'] as string;

  const meal = await prisma.meal.findMany({
    where: {
      sub: sub,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    status: 200,
    jsonBody: meal,
  };
}

app.http("findMeals", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [],
  handler: findMeals,
  route: "meal",
});
