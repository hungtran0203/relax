import addCourse, * as actions from './add';
import removeCourse from './remove';
import {updateCourseField} from './update';

export default {
  addCourse,
  removeCourse,
  updateCourseField,
  ...actions,
};
