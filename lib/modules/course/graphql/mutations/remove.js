import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from 'root_lib/server/graphql/authorize';
import courseType from '../types/course';
import CourseModel from '../../models/course';

export default {
  type: courseType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const removedCourse = await CourseModel.findByIdAndRemove(params.id).exec();

    if (!removedCourse) {
      throw new Error('Course not found');
    }

    return removedCourse;
  }
};
