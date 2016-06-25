import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';

export default class NewStudentForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    parentName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    registerDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  changeField (field, value) {
    this.props.changeField(field, value);
  }

  render () {
    const {name, birthdate, parentName, phone, registerDate, email, notes, submit, loading} = this.props;
    return (
      <ModalNew submit={submit} loading={loading} submitLabel="Dang ki">
        <ModalInput
          focus
          value={name}
          placeholder='Ho va ten'
          onChange={this.changeField.bind(this, 'name')}
        />
        <ModalInput
          focus
          value={birthdate}
          placeholder='Ngay sinh'
          onChange={this.changeField.bind(this, 'birthdate')}
        />
        <ModalInput
          focus
          value={parentName}
          placeholder='Ten phu huynh'
          onChange={this.changeField.bind(this, 'parentName')}
        />
        <ModalInput
          focus
          value={phone}
          placeholder='Dien thoai lien he'
          onChange={this.changeField.bind(this, 'phone')}
        />
        <ModalInput
          focus
          value={registerDate}
          placeholder='Ngay dang ki'
          onChange={this.changeField.bind(this, 'registerDate')}
        />
        <ModalInput
          focus
          value={email}
          type="email"
          placeholder='Email'
          onChange={this.changeField.bind(this, 'email')}
        />
        <ModalInput
          focus
          value={notes}
          placeholder='Ghi chu'
          onChange={this.changeField.bind(this, 'notes')}
        />
      </ModalNew>
    );
  }
}
