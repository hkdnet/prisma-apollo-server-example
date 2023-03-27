import { objectType, extendType, intArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
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
