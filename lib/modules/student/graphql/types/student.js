import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import userType from 'root_lib/server/graphql/type/user';
import UserModel from 'root_lib/server/graphql/models/user';

const studentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
    __v: {type: GraphQLInt},

    name: {type: GraphQLString},
    birthdate: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    parentName: {type: GraphQLString},
    phone: {type: GraphQLString},
    registerDate: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    email: {type: GraphQLString},
    notes: {type: GraphQLString},

    updatedBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.createdBy).exec();
      }
    }
  }
});

export default studentType;
