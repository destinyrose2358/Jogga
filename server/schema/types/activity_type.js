const graphql = require('graphql');
const mongoose = require('mongoose');
const GraphQLDate = require('graphql-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLNumber } = graphql;

const ActivityType = new GraphQLObjectType({
  name: 'ActivtyType',
  fields: () => ({
    _id: { type: GraphQLID },
    distance: { type: GraphQLNumber },
    unit: { type: GraphQLString },
    duration: { type: GraphQLNumber },
    sport: { type: GraphQLString },
    title: { type: GraphQLString },
    runType: { type: GraphQLString },
    description: { type: GraphQLString }, 
    date: { type: GraphQLDate }
  })
});

module.exports = ActivityType;