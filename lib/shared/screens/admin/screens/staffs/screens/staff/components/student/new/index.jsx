import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addStudent} from 'actions/student';
import ValidationProvider from 'components/validation';
import validationConnector from 'helpers/validation-connector';

import New from './new';

export default class NewStudentContainer extends Component {
  static propTypes = {
    fragments: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      name: '',
      birthdate: '',
      parentName: '',
      phone: '',
      registerDate: '',
      email: '',
      notes: '',

      loading: false,
      validation: null,
    };
  }

  @bind
  submit () {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        const {store} = this.context;
        const {fragments, onClose} = this.props;
        const {name, birthdate, parentName, phone, registerDate, email, notes} = this.state;
        const actionData = {name, birthdate, parentName, phone, registerDate, email, notes};
        store.dispatch(validationConnector(addStudent(fragments, actionData), (err) => {
          this.setState({loading: false, validation: err})
        }))
        .then((result) => {
          onClose && onClose();
        })
      });
    }
  }

  @bind
  changeField (field, value) {
    this.setState({
      [field]: value
    });
  }

  render () {
    return (
      <ValidationProvider validation={this.state.validation} >
        <New
          {...this.state}
          submit={this.submit}
          changeField={this.changeField}
        />
      </ValidationProvider>
    );
  }
}
