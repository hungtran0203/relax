import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import studentType from '../../types/student';
import StudentModel from '../../../models/student';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(studentType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = StudentModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
