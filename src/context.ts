import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "./util/auth";

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  userId?: number;
};

export const context = ({ req }: { req: Request }): Promise<Context> => {
  const authHeader = req?.headers?.authorization;
  if (authHeader) {
    const { userId } = decodeAuthHeader(authHeader);

    return prisma.user.findUnique({ where: { id: userId } }).then((user) => {
      return { prisma, userId };
    });
  } else {
    return Promise.resolve({ prisma }); // TODO: 401?
  }
};
