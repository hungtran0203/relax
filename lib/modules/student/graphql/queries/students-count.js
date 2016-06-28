import {GraphQLInt} from 'graphql';

import StudentModel from '../../models/student';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    const count = StudentModel.count();
    return count;
  }
};
