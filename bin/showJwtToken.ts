import { PrismaClient } from "@prisma/client";

import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

import { APP_SECRET } from "../src/util/auth";

const email = process.argv[2] || "";

prisma.user.findUnique({ where: { email: email } }).then((user) => {
  if (user) {
    const data = {
      userId: user.id,
    };
    const token = jwt.sign(data, APP_SECRET);
    console.log(token);
    console.log(jwt.verify(token, APP_SECRET));
  } else {
    console.error(`No user found by email = ${email}`);
    process.exit(1);
  }
});
