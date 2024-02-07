import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { Meal } from "../models/Meal";

import { PrismaClient } from "@prisma/client";
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function createMeal(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const authorization = request.headers.get('authorization');
  const token = authorization.split(' ')[1];
  const payload = decode(token);
  const sub = payload['sub'] as string;
  try {
    const json: any = await request.json();

    const meal = await prisma.meal.create({
      data: new Meal(
        sub,
        json.name,
        json.kcal,
        json.protein,
        json.fat,
        json.carbohydrate
      ),
    });

    return {
      jsonBody: meal,
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

app.http("createMeal", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createMeal,
  route: "meal",
});
