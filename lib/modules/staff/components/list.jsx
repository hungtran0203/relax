import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    pages: Entry.fragments.page
  };

  static propTypes = {
    pages: PropTypes.array.isRequired,
    activePageId: PropTypes.string,
    query: PropTypes.object.isRequired
  };

  render () {
    const pages = [
      {
        _id: 'students', date: 1466560761976, state: 'draft', title: 'Danh sách học sinh'
      },
      {
        _id: 'class', date: 1466560761976, state: 'draft', title: 'Xếp lớp'
      },
      {
        _id: 'report', date: 1466560761976, state: 'draft', title: 'Báo cáo'
      },
      {
        _id: 'payroll', date: 1466560761976, state: 'draft', title: 'Công nợ'
      },
      {
        _id: 'feedback', date: 1466560761976, state: 'draft', title: 'Thắc mắc, khiếu nại'
      },
    ]
    return (
      <div>
        {pages.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (page, key) {
    const {activePageId, query} = this.props;
    return (
      <Entry
        page={page}
        key={key}
        active={activePageId === page._id}
        query={query}
      />
    );
  }
}
