const graphql = require('graphql');
const mongoose = require('mongoose');
const GraphQLDate = require('graphql-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    gender: { type: GraphQLString }, 
    birthDate: { type: GraphQLDate }
  })
});

module.exports = UserType;