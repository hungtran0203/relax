import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    courses: Entry.fragments.course
  };

  static propTypes = {
    courses: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  };

  render () {
    const {courses} = this.props;
    return (
      <div>
        {courses.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (course) {
    const {onDelete, search, display} = this.props;
    const inSearch = !search || course.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if (inSearch) {
      return (
        <Entry
          course={course}
          onDelete={onDelete}
          display={display}
          key={course._id}
        />
      );
    }
  }
}
