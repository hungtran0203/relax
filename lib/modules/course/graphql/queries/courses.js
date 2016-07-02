import getProjection from 'root_lib/server/shared/helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from 'root_lib/server/graphql/authorize';
import courseType from '../types/course';
import CourseModel from '../../models/course';
import {paginationQueryArgs, paginateQuery, searchQuery} from 'root_lib/server/graphql/query-pagination';

export default {
  type: new GraphQLList(courseType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = CourseModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
