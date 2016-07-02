import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

const courseInputType = new GraphQLInputObjectType({
  name: 'CourseInput',
  fields: {
    _id: {type: GraphQLID},
    slug: {type: GraphQLString},

    name: {type: GraphQLString},
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},

  }
});

export default courseInputType;
