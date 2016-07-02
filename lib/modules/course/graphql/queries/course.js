import getProjection from 'root_lib/server/shared/helpers/get-projection';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from 'root_lib/server/graphql/authorize';
import courseType from '../types/course';
import CourseModel from '../../models/course';

export default {
  type: courseType,
  args: {
    _id: {
      name: '_id',
      type: GraphQLID
    },
    slug: {
      name: 'slug',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    let result = false;

    if (params.slug || params._id) {
      result = await CourseModel.findOne(params).select(projection).exec();
    } else {
      const frontpage = await SettingModel.findById('frontpage').exec();
      if (!frontpage) {
        throw new Error('Frontpage not defined');
      }
      result = await CourseModel.findById(frontpage.value).select(projection).exec();
    }
    return result;
  }
};

export const validatePageSlug = {
  type: GraphQLBoolean,
  args: {
    slug: {
      name: 'slug',
      type: new GraphQLNonNull(GraphQLString)
    },
    pageId: {
      name: 'pageId',
      type: GraphQLID
    }
  },
  async resolve (root, {slug, pageId}) {
    authorize(root);

    return await CourseModel.count({
      slug,
      _id: {
        $ne: pageId
      }
    }) === 0;
  }
};
