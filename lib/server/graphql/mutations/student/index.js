import addStudent from './add';
import removeStudent from './remove';
import {updateTitle, updateSlug, updateState} from './update';

export default {
  addStudent,
  removeStudent,
  updateStudentTitle: updateTitle,
  updateStudentSlug: updateSlug,
  updateStudentState: updateState
};
