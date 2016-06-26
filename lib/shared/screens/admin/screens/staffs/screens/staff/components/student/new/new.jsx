import Component from 'components/component';
// import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';

// import DateTimePicker from 'components/modal-datetime-picker';
import ModalInput from 'components/validation/modal-input';

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
          field="name"
          onChange={this.changeField.bind(this, 'name')}
        />
        {/*<DateTimePicker
          value={new Date(birthdate)}
          placeholder='Ngay sinh'
          onChange={this.changeField.bind(this, 'birthdate')}
        />*/}
        <ModalInput
          value={birthdate}
          placeholder='Ngay sinh'
          field="birthdate"
          onChange={this.changeField.bind(this, 'birthdate')}
        />
        <ModalInput
          value={parentName}
          placeholder='Ten phu huynh'
          field="parentName"
          onChange={this.changeField.bind(this, 'parentName')}
        />
        <ModalInput
          value={phone}
          placeholder='Dien thoai lien he'
          field="phone"
          onChange={this.changeField.bind(this, 'phone')}
        />
        <ModalInput
          value={email}
          type="email"
          field="email"
          placeholder='Email'
          onChange={this.changeField.bind(this, 'email')}
        />
        <ModalInput
          value={notes}
          field="notes"
          placeholder='Ghi chu'
          onChange={this.changeField.bind(this, 'notes')}
        />
      </ModalNew>
    );
  }
}
