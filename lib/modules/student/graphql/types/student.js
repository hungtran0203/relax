import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import userType from 'root_lib/server/graphql/types/user';
import UserModel from 'root_lib/server/models/user';

const studentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},

    name: {type: GraphQLString},
    birthdate: {
      type: GraphQLFloat,
      resolve ({birthdate}) {
        return birthdate && birthdate.getTime();
      }
    },
    parentName: {type: GraphQLString},
    phone: {type: GraphQLString},
    registerDate: {
      type: GraphQLFloat,
      resolve ({registerDate}) {
        return registerDate && registerDate.getTime();
      }
    },
    email: {type: GraphQLString},
    notes: {type: GraphQLString},

    updatedBy: {
      type: userType,
      async resolve ({updatedBy}) {
        return await UserModel.findById(updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve ({createdBy}) {
        return await UserModel.findById(createdBy).exec();
      }
    }
  }
});

export default studentType;
