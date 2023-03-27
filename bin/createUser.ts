import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const name = "foo";
const email = "foo@example.com";
const rawPassword = "asdfasdf";

var salt = bcrypt.genSaltSync(10);
bcrypt.hash(rawPassword, salt).then((hash) => {
  prisma.user
    .create({ data: { name, email, password: hash } })
    .then((user) => {
      console.log(`saved: ${user}`);
    })
    .catch(console.error);
});
