const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const AuthServices = require("../../services/auth");
const UserType = require('./user_type');
const User = mongoose.model('User');
const Route = mongoose.model("route");

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    currentUser: {
      type: UserType, 
      async resolve(_, args, ctx) {
        const user = await AuthServices.verifyUser(ctx);
        console.log(user);
        return user;
      }
    },
    userRoutes: {
      type: new GraphQLList(require("./route_type")),
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Route.findBy({ author: args._id });
      }
    }
  })
});

module.exports = RootQueryType;