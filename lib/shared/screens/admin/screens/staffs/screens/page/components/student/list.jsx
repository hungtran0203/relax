import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    students: Entry.fragments.student
  };

  static propTypes = {
    students: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  };

  render () {
    const {students} = this.props;
    return (
      <div>
        {students.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (student) {
    const {onDelete, search, display} = this.props;
    const inSearch = !search || student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if (inSearch) {
      return (
        <Entry
          student={student}
          onDelete={onDelete}
          display={display}
          key={student._id}
        />
      );
    }
  }
}
