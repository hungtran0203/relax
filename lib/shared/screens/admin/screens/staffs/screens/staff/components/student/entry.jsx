import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './entry.less';

export default class Entry extends Component {
  static fragments = {
    student: {
      _id: 1,
      name: 1,
      slug: 1,
      email: 1
    }
  };

  static propTypes = {
    student: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  };

  @bind
  onDeleteClick () {
    const {student, onDelete} = this.props;
    onDelete(student);
  }

  render () {
    const {student, display} = this.props;
    const url = getGravatarImage(student.email, 125);

    return (
      <div className={cx(styles.root, styles[display])}>
        <Link to={`/admin/staffs/student/${student._id}`} className={styles.link}>
          <div className={styles.student}>
            <img src={url} role='presentation' />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{student.name}</div>
          </div>
        </Link>
        <div className={styles.actions}>
          <button className={cx(styles.button, styles.remove)} onClick={this.onDeleteClick}>Remove</button>
        </div>
      </div>
    );
  }
}
