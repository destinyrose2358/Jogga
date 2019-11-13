const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const AuthServices = require("../../services/auth");
const UserType = require('./user_type');
const User = mongoose.model('User');

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
    }
  })
});

module.exports = RootQueryType;