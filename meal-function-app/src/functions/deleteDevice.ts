import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function deleteMeal(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const sub = payload['sub'] as string;
  try {
    const deviceId = Number(request.params.deviceId);

    const meal = await prisma.meal.delete({
      where: {
        id: deviceId,
        AND: {
          sub: sub,
        },
      },
    });

    return {
      status: 200,
      jsonBody: meal,
    };
  } catch (error) {
    switch (error.code) {
      case "P2025":
        return {
          status: 404,
          jsonBody: {
            message: `Meal with id ${request.params.deviceId} not found`,
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
  handler: deleteMeal,
  route: "meal/{deviceId}",
});
