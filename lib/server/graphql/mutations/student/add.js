import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import studentInputType from '../../types/student-input';
import studentType from '../../types/student';
import StudentModel from '../../../models/student';

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
    const student = await studentModel.save();

    if (!student) {
      throw new Error('Error creating student');
    }

    return student;
  }
};
