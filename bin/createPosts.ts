import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = "foo@example.com";

prisma.user
  .findUnique({ where: { email } })
  .then((user) => {
    if (user) {
      const userId = user.id;
      return prisma.post.createMany({
        data: [...Array(5).keys()].map((i) => {
          return { title: `title${i}`, body: `body${i}`, authorId: userId };
        }),
      });
    } else {
      throw new Error("No such user");
    }
  })
  .then((posts) => {
    console.log(`ok: ${posts}`);
  })
  .catch(console.error);
