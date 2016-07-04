import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import EditableTitle from 'shared_components/editable-title';
import {updateField} from 'modules/course/actions/course';
import validationConnector from 'root_lib/shared/helpers/validation-connector';
import { Combobox } from 'react-widgets';

import EditableDateTime from 'modules/components/EditableDateTime';

import StudentList from './StudentList'
import styles from './info.less';

export default class Info extends Component {
  static fragments = {
    course: {
      _id: 1,
      name: 1,
      startDate: 1,
      endDate: 1,
      status: 1,
      students: {
        name: 1,
        score: 1,
        notes: 1,
      },
      studentCount: 1,
      teachers: 1,
      assistants: 1,
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
    return (
      <div className={cx(styles.root, styles[display])}>
        <div className='grid'>
          <div className='info-col-left'>
            <div className={styles.info}>
              <div className={styles.title}>Ma lop:</div>
              <EditableTitle value={course.name} onSubmit={this.updateField.bind(this, 'name')} />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>So luong hoc sinh:</div>
              <div className={styles.title}>{course.studentCount}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>Ngay bat dau:</div>
              <EditableDateTime
                value={course.startDate}
                onSubmit={this.updateField.bind(this, 'startDate')}
                time={false}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>Ngay ket thuc:</div>
              <EditableDateTime
                value={course.endDate}
                onSubmit={this.updateField.bind(this, 'endDate')}
                min={new Date(course.startDate)}
                time={false}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>Tinh trang:</div>
              <div className={styles.title}>{course.status}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>Giao vien:</div>
              <div className={styles.title}>{course.teachers}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>Tro giang:</div>
              <div className={styles.title}>{course.asisstants}</div>
            </div>
          </div>
          <div className='info-col-right'>
            <div className={styles.info}>
              <div className={styles.title}>Danh sach hoc sinh:</div>
              <StudentList students={course.students} course={course} fragments={Info.fragments}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
