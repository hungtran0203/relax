import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addCourse} from 'modules/course/actions/course';
import ValidationProvider from 'shared_components/validation';
import validationConnector from 'root_lib/shared/helpers/validation-connector';

import New from './new';

export default class NewCourseContainer extends Component {
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
        store.dispatch(validationConnector(addCourse(fragments, actionData), (err) => {
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
