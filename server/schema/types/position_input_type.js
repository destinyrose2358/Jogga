const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLInputObjectType, GraphQLFloat } = graphql;

const PositionInputType = new GraphQLInputObjectType({
  name: "PositionInputType",
  fields: () => ({
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  })
});

module.exports = PositionInputType;