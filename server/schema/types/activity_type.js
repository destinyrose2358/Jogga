const graphql = require('graphql');
const mongoose = require('mongoose');
const GraphQLDate = require('graphql-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } = graphql;
const User = mongoose.model("User");
const Activity = mongoose.model("Activity");

const ActivityType = new GraphQLObjectType({
  name: 'ActivityType',
  fields: () => ({
    _id: { type: GraphQLID },
    distance: { type: GraphQLInt },
    unit: { type: GraphQLString },
    duration: { type: GraphQLInt },
    sport: { type: GraphQLString },
    title: { type: GraphQLString },
    runType: { type: GraphQLString },
    description: { type: GraphQLString }, 
    date: { type: GraphQLDate }, 
    author: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.author)
          .then(user => user)
          .catch(err => null);
      }
    },
  })
    //   type: require("./user_type"),
    //   resolve(parentValue) {
    //     return User.findById(parentValue.author)
    //       .then(user => user)
    //       .catch(err => null);
    //   }
    // },
  // })
});

module.exports = ActivityType;