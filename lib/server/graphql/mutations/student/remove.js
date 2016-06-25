import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import studentType from '../../types/student';
import StudentModel from '../../../models/student';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';

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
