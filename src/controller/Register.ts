import { PrismaClient } from "@prisma/client";
import * as express from "express";

const prisma = new PrismaClient();

export default function Register(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next();
}
