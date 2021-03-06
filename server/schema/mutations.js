const graphql = require("graphql");
const GraphQLDate = require("graphql-date");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { GraphQLUpload } = require("graphql-upload");
const Route = mongoose.model("route");

const UserType = require("./types/user_type");
const RouteType = require("./types/route_type");
const PositionInputType = require("./types/position_input_type");
const ActivityType = require("./types/activity_type");
const AuthService = require("../services/auth");
const { singleUpload } = require('../services/aws');
const RouteService = require("../services/routes");
const ActivityServices = require('../services/activities');

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
    updateUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }, 
        profile_img: { type: GraphQLUpload }
      }, 
      async resolve(_, args) {
        console.log("start")
        const updateObj = {};
        if(args.profile_img) {
          const key = await singleUpload(args.profile_img);
          console.log("received key");
          updateObj.profile_img = key
          return User.findOneAndUpdate(
            { _id: args._id },
            { $set: updateObj },
            { new: true },
            (err, user) => {
              console.log(user)
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
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        birthDate: { type: GraphQLDate },
        gender: {
          type: GraphQLString,
          enum: ['male', 'female', 'other']
        },
        profile_img: { type: GraphQLUpload }
      }, 
      async resolve(_, args) {
        return AuthService.updateUser(args);
      }
    },
    createRoute: {
      type: RouteType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        isPrivate: { type: GraphQLBoolean },
        token: { type: GraphQLString },
        positions: { type: new GraphQLList(PositionInputType) },
        travelMode: {type: GraphQLString }
      },
      resolve(_, args) {
        return RouteService.createRoute(args);
      }
    },
    deleteRoute: {
      type: RouteType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args, ctx) {
        return RouteService.deleteRoute({ _id: args._id, token: ctx.token });
      }
    },
    createActivity: {
      type: ActivityType, 
      args: {
        distance: { type: GraphQLInt },
        unit: { type: GraphQLString },
        duration: { type: GraphQLInt },
        sport: { type: GraphQLString },
        title: { type: GraphQLString },
        runType: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLDate }, 
      }, 
      async resolve(_, args, ctx) {
        debugger;
        const author = await AuthService.verifyUser(ctx);
        console.log(author);
        args.author = author._id
        return ActivityServices.createActivity(args);
      }
    }
	}
});

module.exports = mutation;