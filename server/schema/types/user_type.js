const graphql = require('graphql');
const mongoose = require('mongoose');
const GraphQLDate = require('graphql-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const { s3 } = require("../../services/aws");

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    gender: { type: GraphQLString }, 
    birthDate: { type: GraphQLDate }, 
    profile_img: { 
      type: GraphQLString,
      resolve(parentValue) {
        let imageUrl;
        if (parentValue.profile_img) {
          imageUrl = s3.getSignedUrl('getObject', {
            Bucket: "jogga",
            Key: parentValue.profile_img
          });
        }
        return imageUrl || parentValue.profile_img;
      }
     }
  })
});

module.exports = UserType;