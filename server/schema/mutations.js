const graphql = require("graphql");
const GraphQLDate = require("graphql-date");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { GraphQLUpload } = require("graphql-upload");
const UserType = require("./types/user_type");
const AuthService = require("../services/auth");
const { singleUpload } = require('../services/aws');

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
    updateUserImg: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }, 
        profile_img: { type: GraphQLUpload }
      }, 
      async resolve(_, args) {
        const updateObj = {};
        if(args.profile_img) {
          const key = await singleUpload(args.profile_img);
          console.log(key)
          updateObj.profile_img = key
          return User.findOneAndUpdate(
            { _id: args._id },
            { $set: updateObj },
            { new: true },
            (err, user) => {
              return user;
            }
          )
        }
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
    },
    fetchCurrentUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.fetchCurrentUser(args);
      }
    }
	}
});

module.exports = mutation;