const { forwardTo } = require('prisma-binding');

const Query = {

  items: forwardTo('db'),
  // dogs: function(parent, args, ctx, info) { // will always need 4 different variables
  //   return [{name: 'Snickers' }, { name: "Snuckers"}]
  // }

 // async items(parent, args, ctx, info) {
 //    const items = await ctx.db.query.items();
 //
 //    return items;
 //  }
};

module.exports = Query;
