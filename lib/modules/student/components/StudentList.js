import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeStudent} from 'actions/student';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Students from './students.jsx';

@dataConnect(
  (state) => ({
    location: state.router.location,
  }),
  (dispatch) => bindActionCreators({removeStudent}, dispatch),
  () => ({
    fragments: Students.fragments,
    mutations: {
      addStudent: [{
        type: 'APPEND',
        field: 'students'
      }]
    }
  })
)
export default class StudentsContainer extends Component {
  static propTypes = {
    students: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    removeStudent: PropTypes.func.isRequired
  };

  static defaultProps = {
    students: []
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
  onDelete (student) {
    this.setState({
      deleteConfirm: true,
      deleteConfirmStudent: student
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      deleteConfirm: false,
      deleteConfirmStudent: null,
      deletingStudent: false
    });
  }

  @bind
  confirmDelete () {
    const {deleteConfirmStudent} = this.state;
    this.setState({
      deletingStudent: true
    });
    this.props.removeStudent(deleteConfirmStudent._id).then(() => {
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
    const {students} = this.props;
    return (
      <Students
        students={students}
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
