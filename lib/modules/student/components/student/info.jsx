import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import EditableTitle from 'shared_components/editable-title';
import {updateField} from 'modules/student/actions/student';
import validationConnector from 'root_lib/shared/helpers/validation-connector';
import EditableDateTime from 'modules/components/EditableDateTime';

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

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  @bind
  updateField (name, value) {
    const {student} = this.props;
    const {store} = this.context;
    return store.dispatch(validationConnector(updateField(student._id, name, value), (err) => {
      this.setState({loading: false, validation: err})
    }))
  }

  render () {
    const {student, display} = this.props;
    const url = getGravatarImage(student.email, 125);
    return (
      <div className={cx(styles.root, styles[display])}>
        <div className='grid'>
          <div className='info-col-left'>
            <div className={styles.avatar}>
              <img src={url} role='presentation' />
            </div>
          </div>
          <div className='info-col-right'>
            <div className={styles.info}>
              <div className={styles.label}>Ho va ten:</div>
              <div className={styles.input}>
                <EditableTitle value={student.name} onSubmit={this.updateField.bind(this, 'name')} />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Ngay sinh:</div>
              <div className={styles.input}>
                <EditableDateTime
                  value={student.birthdate}
                  placeholder='Ngay sinh'
                  field="birthdate"
                  time={false}
                  onSubmit={this.updateField.bind(this, 'birthdate')}
                  max={new Date()}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Ten phu huynh:</div>
              <div className={styles.input}>
                <EditableTitle className={styles.input} value={student.parentName} onSubmit={this.updateField.bind(this, 'parentName')} />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Phone:</div>
              <div className={styles.input}>
                <EditableTitle className={styles.input} value={student.phone} onSubmit={this.updateField.bind(this, 'phone')} />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Ngay dang ky:</div>
              <div className={styles.input}>{student.registerDate}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Email:</div>
              <div className={styles.input}>{student.email}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.label}>Ghi chu:</div>
              <div className={styles.input}>
                <EditableTitle value={student.notes} onSubmit={this.updateField.bind(this, 'notes')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
