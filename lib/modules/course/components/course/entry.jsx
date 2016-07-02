import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './entry.less';

export default class Entry extends Component {
  static fragments = {
    course: {
      _id: 1,
      name: 1,
      slug: 1,
      email: 1
    }
  };

  static propTypes = {
    course: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  };

  @bind
  onDeleteClick () {
    const {course, onDelete} = this.props;
    onDelete(course);
  }

  render () {
    const {course, display} = this.props;
    const url = getGravatarImage(course.email, 125);

    return (
      <div className={cx(styles.root, styles[display])}>
        <Link to={`/admin/staffs/course/${course._id}`} className={styles.link}>
          <div className={styles.course}>
            <img src={url} role='presentation' />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{course.name}</div>
          </div>
        </Link>
        <div className={styles.actions}>
          <button className={cx(styles.button, styles.remove)} onClick={this.onDeleteClick}>Remove</button>
        </div>
      </div>
    );
  }
}
