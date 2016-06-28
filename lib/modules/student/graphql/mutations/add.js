import getUniqueSlug from 'root_lib/server/shared/helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';
import { GraphQLError, locatedError } from 'graphql/error'; // ES6

import authorize from 'root_lib/server/graphql/authorize';
import studentInputType from '../types/student-input';
import studentType from '../types/student';
import StudentModel from '../../models/student';

export default {
  type: studentType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(studentInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const studentData = Object.assign({}, params.data);
    // Generate slug if needed
    if (!studentData.slug) {
      studentData.slug = await getUniqueSlug(StudentModel, studentData.name);
    }

    // Add user info
    studentData.createdBy = root.user._id;
    studentData.updatedBy = root.user._id;

    const studentModel = new StudentModel(studentData);
    let student;
    try {
      student = await studentModel.save();
    } catch (err) {
      throw new GraphQLError(JSON.stringify(err));
    }

    if (!student) {
      throw new Error('Error creating student');
    }

    return student;
  }
};
