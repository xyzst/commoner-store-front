const Mutations = { // Have to mirror in schema.graphql
  async createItem(parent, args, ctx, info) {
    //TODO: Check if user is logged in

    const item = await ctx.db.mutation.createItem(
      { // createItem comes from prisma.graphql, returns a promise need to add await sync keyword
        data: {
          ...args,
        },
      },
      info
    );

    return item;
  },

  // can just return the promise but helps for debugging

  // can use global keyword to temporarily store objects in memory
  // createDog(parent, args, ctx, info) {
  //   console.log(args);
  // }
};

module.exports = Mutations;
