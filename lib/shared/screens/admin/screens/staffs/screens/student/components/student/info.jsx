import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './info.less';

export default class Info extends Component {
  static fragments = {
    student: {
      _id: 1,
      name: 1,
      birthdate: 1,
      parentName: 1,
      phone: 1,
      registerDate: 1,
      email: 1,
      notes: 1,
    }
  };

  static propTypes = {
    student: PropTypes.object.isRequired,
  };

  render () {
    const {student, display} = this.props;
    const url = getGravatarImage(student.email, 125);
    return (
      <div className={cx(styles.root, styles[display])}>
        <div className={styles.student}>
          <img src={url} role='presentation' />
        </div>
        <div className={styles.info}>
        <div className={styles.title}>Ho va ten:</div>
          <div className={styles.title}>{student.name}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ngay sinh:</div>
          <div className={styles.title}>{student.birthdate}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ten phu huynh:</div>
          <div className={styles.title}>{student.parentName}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Phone:</div>
          <div className={styles.title}>{student.phone}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ngay dang ky:</div>
          <div className={styles.title}>{student.registerDate}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Email:</div>
          <div className={styles.title}>{student.email}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ghi chu:</div>
          <div className={styles.title}>{student.notes}</div>
        </div>
      </div>
    );
  }
}
