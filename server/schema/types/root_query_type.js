const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const AuthServices = require("../../services/auth");
const UserType = require('./user_type');
const User = mongoose.model('User');
const Route = mongoose.model("route");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");

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
        return user;
      }
    },
    activities: {
      type: new GraphQLList(require('./activity_type')),
      resolve() {
        return Activity.find({});
      }
    },
    userActivities: {
      type: new GraphQLList(require('./activity_type')),
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Activity.find({ author: args._id });
      }
    },
    userRoutes: {
      type: new GraphQLList(require("./route_type")),
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Route.find({ author: args._id });
      }
    },
    currentUserRoutes: {
      type: new GraphQLList(require("./route_type")),
      resolve(_a, _b, ctx) {
        const { _id } = jwt.verify(ctx.token, keys.secretOrKey);
        return Route.find({ author: _id })
      }
    }
  })
});

module.exports = RootQueryType;