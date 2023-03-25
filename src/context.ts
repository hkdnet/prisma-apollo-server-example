import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  // TODO
  return {
    prisma,
    userId: 1,
  };
};
