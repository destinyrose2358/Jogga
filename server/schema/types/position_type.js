const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLFloat } = graphql;

const PositionType = new GraphQLObjectType({
  name: "PositionType",
  fields: () => ({
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  })
});

module.exports = PositionType;