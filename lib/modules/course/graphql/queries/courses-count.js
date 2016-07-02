import {GraphQLInt} from 'graphql';

import CourseModel from '../../models/course';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    const count = CourseModel.count();
    return count;
  }
};
