import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';

export default class NewStudentForm extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  changeField (field, value) {
    this.props.changeField(field, value);
  }

  render () {
    const {username, password, name, email, submit, loading} = this.props;
    return (
      <ModalNew submit={submit} loading={loading} submitLabel="Dang ki">
        <ModalInput
          focus
          value={username}
          placeholder='Ho va ten'
          onChange={this.changeField.bind(this, 'username')}
        />
        <ModalInput
          focus
          value={password}
          type='password'
          placeholder='Ngay sinh'
          onChange={this.changeField.bind(this, 'password')}
        />
        <ModalInput
          focus
          value={name}
          placeholder='Ten phu huynh'
          onChange={this.changeField.bind(this, 'name')}
        />
        <ModalInput
          focus
          value={name}
          placeholder='Dien thoai lien he'
          onChange={this.changeField.bind(this, 'name')}
        />
        <ModalInput
          focus
          value={name}
          placeholder='Ngay dang ki'
          onChange={this.changeField.bind(this, 'name')}
        />
        <ModalInput
          focus
          value={email}
          placeholder='Email'
          onChange={this.changeField.bind(this, 'email')}
        />
        <ModalInput
          focus
          value={name}
          placeholder='Ghi chu'
          onChange={this.changeField.bind(this, 'name')}
        />
      </ModalNew>
    );
  }
}
