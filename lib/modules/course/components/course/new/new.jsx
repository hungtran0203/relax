import Component from 'components/component';
// import ModalInput from 'components/modal-input';
import ModalNew from 'shared_components/modal-new';
import React, {PropTypes} from 'react';

// import DateTimePicker from 'components/modal-datetime-picker';
import ModalInput from 'shared_components/validation/modal-input';

export default class NewCourseForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  changeField (field, value) {
    this.props.changeField(field, value);
  }

  render () {
    const {name, submit, loading} = this.props;
    return (
      <ModalNew submit={submit} loading={loading} submitLabel="Mo lop">
        <ModalInput
          focus
          value={name}
          placeholder='Nhap ma lop'
          field="name"
          onChange={this.changeField.bind(this, 'name')}
        />
      </ModalNew>
    );
  }
}
