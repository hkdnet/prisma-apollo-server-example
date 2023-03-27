import { objectType, extendType, intArg } from "nexus";
import { prisma } from "../context";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.list.field("posts", {
      type: "Post",
      async resolve(parent, args, context) {
        return prisma.post.findMany({ where: { authorId: parent.id } });
      },
    });
    // t.nonNull.list.nonNull.field("links", {
    //   type: "Link",
    //   resolve(parent, args, context) {
    //     return context.prisma.user
    //       .findUnique({ where: { id: parent.id } })
    //       .links();
    //   },
    // });
    // t.nonNull.list.nonNull.field("votes", {
    //   type: "Link",
    //   resolve(parent, args, context) {
    //     return context.prisma.user
    //       .findUnique({ where: { id: parent.id } })
    //       .votes();
    //   },
    // });
  },
});

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.int("authorId");
    t.nonNull.field("author", {
      type: "User",
      async resolve(parent, args, context) {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.authorId },
        });
        if (user) {
          return user;
        } else {
          throw new Error("cannot find the author");
        }
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getCurrentUser", {
      type: "User",
      args: {},
      async resolve(parent, args, context) {
        if (!context.userId) {
          throw new Error("unauthorized"); // TODO: how to handle this?
        }
        return {
          id: context.userId,
          name: "foo",
          email: "foo@example.com",
        };
      },
    });
  },
});
