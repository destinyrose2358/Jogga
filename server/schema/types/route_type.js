const graphql = require("graphql");
const mongoose = require('mongoose');
const GraphQLDate = require("graphql-date");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const User = mongoose.model("User");
const PositionType = require("./position_type");

const RouteType = new GraphQLObjectType({
  name: "RouteType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    isPrivate: { type: GraphQLBoolean },
    author: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.author)
          .then(user => user)
          .catch(err => null);
      }
    },
    positions: { type: GraphQLList(PositionType) },
    date: { type: GraphQLDate },
    travelMode: { type: GraphQLString }
  })
});

module.exports = RouteType;