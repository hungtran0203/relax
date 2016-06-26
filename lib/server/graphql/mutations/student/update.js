import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import studentType from '../../types/student';
import updateItem from '../_helpers/update-item';
import Model from '../../../models/student';

export const updateField = {
  type: studentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const updateData = Object.assign(
      {},
      {
        name: params.name
      },
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






export const updateTitle = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: 'page',
      changes: {title: params.title},
      projection,
      userId: root.user._id
    });
    return item;
  }
};

export const updateSlug = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: 'page',
      changes: {slug: params.slug},
      projection,
      userId: root.user._id
    });
    return item;
  }
};

export const updateState = {
  type: pageType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    state: {
      name: 'state',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: 'page',
      changes: {state: params.state},
      projection,
      userId: root.user._id
    });
    return item;
  }
};
