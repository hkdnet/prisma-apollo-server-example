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
    t.nonNull.field("getUserById", {
      type: "User",
      args: {
        id: intArg(),
      },
      async resolve(parent, args, context) {
        // TODO
        return {
          id: 1,
          name: "foo",
          email: "foo@example.com",
        }
      },
    });
  },
});
