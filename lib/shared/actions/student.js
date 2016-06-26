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

export function updateField (id, name) {
  return mutation({
    fragments: {
      updateField: {
        _id: 1,
        name: 1,
      }
    },
    variables: {
      updateField: {
        id: {
          value: id,
          type: 'ID!'
        },
        name: {
          value: name,
          type: 'String!'
        }
      }
    }
  });
}
