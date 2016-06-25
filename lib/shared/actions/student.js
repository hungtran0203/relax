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
