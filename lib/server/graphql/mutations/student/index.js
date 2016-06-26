import addStudent from './add';
import removeStudent from './remove';
import {updateTitle, updateField, updateSlug, updateState} from './update';

export default {
  addStudent,
  removeStudent,
  updateField: updateField,
  updateStudentTitle: updateTitle,
  updateStudentSlug: updateSlug,
  updateStudentState: updateState
};
