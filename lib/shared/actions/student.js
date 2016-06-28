import {mutation} from 'relate-js';

export function removeStudent (id) {
  return mutation({
    fragments: {
      removeStudent: {
        _id: 1
      }
    },
    variables: {
      removeStudent: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  });
}

export function addStudent (fragments, data) {
  return mutation({
    fragments: {
      addStudent: fragments.students
    },
    variables: {
      addStudent: {
        data: {
          value: data,
          type: 'StudentInput!'
        }
      }
    }
  });
}

export function updateField (id, name, value) {
  const fragments = {
    _id: 1,
  }
  fragments[name] = 1;
  return mutation({
    fragments: {
      updateStudentField: fragments
    },
    variables: {
      updateStudentField: {
        id: {
          value: id,
          type: 'ID!'
        },
        name: {
          value: name,
          type: 'String!'
        },
        value: {
          value: value,
          type: 'String!'
        }
      }
    }
  });
}
