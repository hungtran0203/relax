import getUniqueSlug from 'root_lib/server/shared/helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';
import { GraphQLError, locatedError } from 'graphql/error'; // ES6

import authorize from 'root_lib/server/graphql/authorize';
import courseInputType from '../types/course-input';
import courseType from '../types/course';
import CourseModel from '../../models/course';

export default {
  type: courseType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(courseInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const courseData = Object.assign({}, params.data);
    // Generate slug if needed
    if (!courseData.slug) {
      courseData.slug = await getUniqueSlug(CourseModel, courseData.name);
    }

    // Add user info
    courseData.createdBy = root.user._id;
    courseData.updatedBy = root.user._id;

    const courseModel = new CourseModel(courseData);
    let course;
    try {
      course = await courseModel.save();
    } catch (err) {
      throw new GraphQLError(JSON.stringify(err));
    }

    if (!course) {
      throw new Error('Error creating course');
    }

    return course;
  }
};
