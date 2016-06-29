import getProjection from 'root_lib/server/shared/helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from 'root_lib/server/graphql/authorize';
import studentType from '../types/student';
import Model from '../../models/student';

export const updateStudentField = {
  type: studentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const changes = {};
    changes[params.name] = params.value;
    const updateData = Object.assign(
      {},
      changes,
      {
        updatedDate: new Date(),
        updatedBy: root.user._id
      }
    );
    const projection = getProjection(options.fieldASTs[0]);
    let item;
    try {
      item = await Model
        .findByIdAndUpdate(
          params.id,
          updateData,
          {upsert: true, new: true, runValidators: true}
        )
        .select(projection);
    } catch (err) {
      throw new Error(JSON.stringify(err))
    }

    if (!item) {
      throw new Error(`Error updating ${type}`);
    }

    return item;
  }
};
