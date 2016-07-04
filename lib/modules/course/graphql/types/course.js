import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import userType from 'root_lib/server/graphql/types/user';
import UserModel from 'root_lib/server/models/user';
import studentType from 'modules/student/graphql/types/student'
import StudentModel from 'modules/student/models/student'

export const StudentCourse = new GraphQLObjectType({
  name: 'StudentCourse',
  fields: {
    studentId: {type: new GraphQLNonNull(GraphQLID)},
    name: {
      type: GraphQLString,
      async resolve ({studentId}) {
        const student = await StudentModel.findById(studentId).exec();
        return student.name
      }
    },
    score: {
      type: GraphQLFloat,
    },
    notes: {
      type: GraphQLString,
    }
  }
})

const courseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},

    name: {type: GraphQLString},
    students: {
      type: new GraphQLList(StudentCourse) ,
      resolve ({students}) {
        return students;
        // return [{name: 1, score: 2, notes: 3}, {name: 1, score: 2, notes: 3}, {name: 1, score: 2, notes: 3}]
      }
    },
    studentCount: {
      type: GraphQLInt,
      resolve ({students}) {
        return students.length;
      }
    },
    startDate: {
      type: GraphQLFloat,
      resolve ({startDate}) {
        return startDate && startDate.getTime();
      }
    },
    endDate: {
      type: GraphQLFloat,
      resolve ({endDate}) {
        return endDate && endDate.getTime();
      }
    },
    teachers: {
      type: GraphQLString,
    },
    assistants: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLInt,
      resolve ({status}) {
        return 1;
      }
    },
    updatedBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.createdBy).exec();
      }
    }
  }
});

export default courseType;
