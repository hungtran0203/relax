import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeCourse} from 'modules/course/actions/course';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Courses from './courses.jsx';

@dataConnect(
  (state) => ({
    location: state.router.location,
  }),
  (dispatch) => bindActionCreators({removeCourse}, dispatch),
  () => ({
    fragments: Courses.fragments,
    mutations: {
      addCourse: [{
        type: 'APPEND',
        field: 'courses'
      }]
    }
  })
)
export default class CoursesContainer extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    removeCourse: PropTypes.func.isRequired
  };

  static defaultProps = {
    courses: []
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
  onDelete (course) {
    this.setState({
      deleteConfirm: true,
      deleteConfirmCourse: course
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      deleteConfirm: false,
      deleteConfirmCourse: null,
      deletingCourse: false
    });
  }

  @bind
  confirmDelete () {
    const {deleteConfirmCourse} = this.state;
    this.setState({
      deletingCourse: true
    });
    this.props.removeCourse(deleteConfirmCourse._id).then(() => {
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
    const {courses} = this.props;
    return (
      <Courses
        courses={courses}
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
