import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export const StudentCourseInput = new GraphQLInputObjectType({
  name: 'StudentCourseInput',
  fields: {
    _id: {type: GraphQLID},
    studentId: {type: GraphQLID},
    name: {type: GraphQLString},
    score: {type: GraphQLString},
    notes: {type: GraphQLString},
  }
});

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
