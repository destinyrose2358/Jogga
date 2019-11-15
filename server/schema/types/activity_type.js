const graphql = require('graphql');
const mongoose = require('mongoose');
const GraphQLDate = require('graphql-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } = graphql;

const ActivityType = new GraphQLObjectType({
  name: 'ActivtyType',
  fields: () => ({
    _id: { type: GraphQLID },
    distance: { type: GraphQLInt },
    unit: { type: GraphQLString },
    duration: { type: GraphQLDate },
    sport: { type: GraphQLString },
    title: { type: GraphQLString },
    runType: { type: GraphQLString },
    description: { type: GraphQLString }, 
    date: { type: GraphQLDate }, 
    author: { type: GraphQLID }
  })
});

module.exports = ActivityType;