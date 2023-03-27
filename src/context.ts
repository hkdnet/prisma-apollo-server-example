import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "./util/auth";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const authHeader = req?.headers?.authorization;
  if (authHeader) {
    const { userId } = decodeAuthHeader(authHeader);
    return { prisma, userId };
  } else {
    return { prisma }; // TODO: 401?
  }
};
