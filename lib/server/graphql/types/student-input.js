import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

const studentInputType = new GraphQLInputObjectType({
  name: 'StudentInput',
  fields: {
    _id: {type: GraphQLID},
    slug: {type: GraphQLString},
    __v: {type: GraphQLInt},

    name: {type: GraphQLString},
    birthdate: {
      type: GraphQLFloat,
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    parentName: {type: GraphQLString},
    phone: {type: GraphQLString},
    registerDate: {
      type: GraphQLFloat,
      resolve: () => Date.now()
    },
    email: {type: GraphQLString},
    notes: {type: GraphQLString},
    updatedBy: {type: GraphQLID},
    createdBy: {type: GraphQLID},

  }
});

export default studentInputType;
