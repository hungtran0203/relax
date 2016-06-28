import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from 'root_lib/server/graphql/authorize';
import studentType from '../types/student';
import StudentModel from '../../models/student';

export default {
  type: studentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const removedStudent = await StudentModel.findByIdAndRemove(params.id).exec();

    if (!removedStudent) {
      throw new Error('Student not found');
    }

    await TabModel.find({item: params.id}).remove();
    await RevisionModel.find({itemId: params.id}).remove();

    return removedStudent;
  }
};
