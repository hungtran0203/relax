import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addStudent} from 'actions/student';

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

      loading: false
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
        console.log(this.state)
        const {name, birthdate, parentName, phone, registerDate, email, notes} = this.state;
        const actionData = {name, birthdate, parentName, phone, registerDate, email, notes};
        console.log(actionData, 'lllllllllllll')
        store.dispatch(addStudent(fragments, actionData, true)).then(() => {
          onClose && onClose();
        });
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
      <New
        {...this.state}
        submit={this.submit}
        changeField={this.changeField}
      />
    );
  }
}
