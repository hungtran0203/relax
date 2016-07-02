import color from './color';
import draft from './draft';
import media from './media';
import menu from './menu';
import page from './page';
import revision from './revision';
import schema from './schemas';
import schemaEntry from './schema-entry';
import settings from './settings';
import style from './style';
import symbol from './symbol';
import tab from './tab';
import template from './template';
import user from './user';

import student from 'modules/student/graphql/queries';
import course from 'modules/course/graphql/queries';

export default {
  ...color,
  ...draft,
  ...media,
  ...menu,
  ...page,
  ...revision,
  ...schemaEntry,
  ...schema,
  ...settings,
  ...style,
  ...symbol,
  ...tab,
  ...user,
  ...template,

  ...student,
  ...course,
};
