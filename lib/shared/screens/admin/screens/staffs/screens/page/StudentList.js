import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeUser} from 'actions/users';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Students from './components/students.jsx';

@dataConnect(
  () => ({}),
  (dispatch) => bindActionCreators({removeUser}, dispatch),
  () => ({
    fragments: Students.fragments,
    mutations: {
      addUser: [{
        type: 'APPEND',
        field: 'users'
      }]
    }
  })
)
export default class StudentsContainer extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    users: []
  };

  getInitState () {
    return {
      display: 'grid',
      newOpened: false,
      search: ''
    };
  }

  @bind
  openNew () {
    this.setState({
      newOpened: true
    });
  }

  @bind
  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  @bind
  searchChange (search) {
    this.setState({
      search
    });
  }

  @bind
  onDelete (user) {
    this.setState({
      deleteConfirm: true,
      deleteConfirmUser: user
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      deleteConfirm: false,
      deleteConfirmUser: null,
      deletingUser: false
    });
  }

  @bind
  confirmDelete () {
    const {deleteConfirmUser} = this.state;
    this.setState({
      deletingUser: true
    });
    this.props.removeUser(deleteConfirmUser._id).then(() => {
      this.cancelDelete();
    });
  }

  @bind
  displayChange (display) {
    this.setState({
      display
    });
  }

  render () {
    const {users} = this.props;
    return (
      <Students
        users={users}
        {...this.state}
        displayChange={this.displayChange}
        openNew={this.openNew}
        closeNew={this.closeNew}
        onDelete={this.onDelete}
        cancelDelete={this.cancelDelete}
        confirmDelete={this.confirmDelete}
        searchChange={this.searchChange}
      />
    );
  }
}
