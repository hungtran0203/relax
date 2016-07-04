import getUniqueSlug from 'root_lib/server/shared/helpers/get-unique-slug';
import {
  GraphQLNonNull
} from 'graphql';
import { GraphQLError, locatedError } from 'graphql/error'; // ES6
import getProjection from 'root_lib/server/shared/helpers/get-projection';

import authorize from 'root_lib/server/graphql/authorize';
import courseInputType, { StudentCourseInput } from '../types/course-input';
import courseType, { StudentCourse } from '../types/course';
import CourseModel from '../../models/course';

import {pick, omit} from 'lodash'

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

export const addStudentToCourse = {
  type: courseType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(StudentCourseInput)
    }
  },

  async resolve (root, params, options) {
    authorize(root);
    const { data } = params

    const newStudent = pick(data, ['studentId', 'score', 'notes']);
    newStudent.updatedBy = root.user._id;
    newStudent.updatedDate = new Date();
    const current = await CourseModel.findById(data._id);

    const students = current.students;
    students.push(newStudent)
    const changes = {
      students
    }
    const projection = getProjection(options.fieldASTs[0]);
    let item;
    try {
      item = await CourseModel
        .findByIdAndUpdate(
          data._id,
          changes,
          {upsert: true, new: true, runValidators: true}
        )
        .select(projection);
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }

    if (!item) {
      throw new Error(`Error updating ${type}`);
    }

    return item;

  }
};

export const removeStudentFromCourse = {
  type: courseType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(StudentCourseInput)
    }
  },

  async resolve (root, params, options) {
    authorize(root);
    const { data } = params
    const current = await CourseModel.findById(data._id);

    const students = current.students.filter((student) => {
      return String(student.studentId) !== data.studentId;
    });

    const changes = {
      students
    }
    const projection = getProjection(options.fieldASTs[0]);
    let item;
    try {
      item = await CourseModel
        .findByIdAndUpdate(
          data._id,
          changes,
          {upsert: true, new: true, runValidators: true}
        )
        .select(projection);
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }

    if (!item) {
      throw new Error(`Error updating ${type}`);
    }

    return item;

  }
};

export const updateStudentCourse = {
  type: courseType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(StudentCourseInput)
    }
  },

  async resolve (root, params, options) {
    authorize(root);
    const { data } = params
    const current = await CourseModel.findById(data._id);
    const changeValues = omit(data, ['_id', 'studentId', 'name'])
    const students = current.students.map((student) => {
      if(String(student.studentId) === data.studentId) {
        Object.keys(changeValues).map((field) => {
          student[field] = changeValues[field]
        })
      }
      return student
    });

    const changes = {
      students
    }
    const projection = getProjection(options.fieldASTs[0]);
    let item;
    try {
      item = await CourseModel
        .findByIdAndUpdate(
          data._id,
          changes,
          {upsert: true, new: true, runValidators: true}
        )
        .select(projection);
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }

    if (!item) {
      throw new Error(`Error updating ${type}`);
    }

    return item;

  }
};
