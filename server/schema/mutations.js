const graphql = require("graphql");
const GraphQLDate = require("graphql-date");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("User");

const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
        args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    updateUserInfo: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        gender: {
          type: GraphQLString,
          enum: ["male", "female", "other"]
        }
      },
      resolve(_, args) {
        return AuthService.updateUserInfo(args);
      }
    }
	}
});

module.exports = mutation;