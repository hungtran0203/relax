import {mutation} from 'relate-js';

export function removeCourse (id) {
  return mutation({
    fragments: {
      removeCourse: {
        _id: 1
      }
    },
    variables: {
      removeCourse: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  });
}

export function addCourse (fragments, data) {
  return mutation({
    fragments: {
      addCourse: fragments.courses
    },
    variables: {
      addCourse: {
        data: {
          value: data,
          type: 'CourseInput!'
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
      updateCourseField: fragments
    },
    variables: {
      updateCourseField: {
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
