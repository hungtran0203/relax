import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import EditableTitle from 'shared_components/editable-title';
import {updateField} from 'modules/course/actions/course';
import validationConnector from 'root_lib/shared/helpers/validation-connector';

import styles from './info.less';

export default class Info extends Component {
  static fragments = {
    course: {
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
    course: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  @bind
  updateField (name, value) {
    const {course} = this.props;
    const {store} = this.context;
    return store.dispatch(validationConnector(updateField(course._id, name, value), (err) => {
      this.setState({loading: false, validation: err})
    }))
  }

  render () {
    const {course, display} = this.props;
    const url = getGravatarImage(course.email, 125);
    return (
      <div className={cx(styles.root, styles[display])}>
        <div className={styles.course}>
          <img src={url} role='presentation' />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ho va ten:</div>
          <EditableTitle value={course.name} onSubmit={this.updateField.bind(this, 'name')} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ngay sinh:</div>
          <div className={styles.title}>{course.birthdate}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ten phu huynh:</div>
          <EditableTitle value={course.parentName} onSubmit={this.updateField.bind(this, 'parentName')} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Phone:</div>
          <EditableTitle value={course.phone} onSubmit={this.updateField.bind(this, 'phone')} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ngay dang ky:</div>
          <div className={styles.title}>{course.registerDate}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Email:</div>
          <div className={styles.title}>{course.email}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Ghi chu:</div>
          <div className={styles.title}>{course.notes}</div>
        </div>
      </div>
    );
  }
}
