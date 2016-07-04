import Component from 'components/component';
import React, {PropTypes} from 'react';
import bind from 'decorators/bind';
import {
  addStudentToCourse,
  removeStudentFromCourse,
  updateStudentCourse,
} from '../../actions/course';
import { pick } from 'lodash'
import EditableTitle from 'shared_components/editable-title';
import StudentSelect from '../StudentSelect'
import styles from './info.less'

export default class StudentList extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState(){
    return {
      adding: false,
      ...this.getDefaultStudent(),
      students: [],
    }
  }

  getDefaultStudent(){
    return {
      name: '',
      score: '',
      notes: '',
      student: null,
    }
  }

  onChangeField(field, value) {
    this.setState({[field]: value})
  }

  @bind
  onSelectStudent(value) {
    this.setState({student: value})
  }

  @bind
  onChangeStudent(value) {
    const student = (value && value.name) ? value : null
    this.setState({student})
  }

  renderAddingStudent(){
    const {adding} = this.state
    if(!adding) return null

    const {students} = this.state
    const {student} = this.state
    return (
      <tr>
        <td></td>
        <td>
          <StudentSelect onSelect={this.onSelectStudent} onChange={this.onChangeStudent} />
        </td>
        <td>
          <input
            onChange={this.onChangeField.bind(this, 'score')}
            type="text"
            value={this.state.score}
            placeholder="Diem xep lop"
          />
        </td>
        <td>
          <input
            onChange={this.onChangeField.bind(this, 'notes')}
            type="text"
            value={this.state.notes}
            placeholder="Ghi chu"
          />
        </td>
        <td>
          { student && <button onClick={this.onAddStudent}>Ok</button> }
          <button onClick={this.onCancelAddingStudent}>Cancel</button>
        </td>
      </tr>
    )
  }

  onChangeField(field, event) {
    this.setState({[field]: event.target.value})
  }

  @bind
  onCancelAddingStudent() {
    this.setState({
      adding: false,
      ...this.getDefaultStudent(),
    })
  }

  @bind
  onDisplayAddingStudent(){
    this.setState({
      adding: true,
    })
  }

  @bind
  onAddStudent(){
    const {store} = this.context;
    const {fragments, course} = this.props;
    const {student} = this.state

    const actionData = pick(this.state, ['score', 'notes'])
    actionData._id = course._id
    actionData.studentId = student._id

    store.dispatch(addStudentToCourse(fragments.course, actionData))
    .then((result) => {
      this.setState({
        adding: false,
        ...this.getDefaultStudent(),
      })
    })

  }

  onRemoveStudent(studentId){
    const {store} = this.context;
    const {fragments, course} = this.props;
    const actionData = {studentId}
    actionData._id = course._id

    store.dispatch(removeStudentFromCourse(fragments.course, actionData))
    .then((result) => {
      this.setState({adding: false})
    })
  }

  render () {
    const {students} = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Diem xep lop</th>
              <th>Ghi chu</th>
            </tr>
          </thead>
          <tbody>
            {students.map(this.renderEntry, this)}
            {this.renderAddingStudent()}
          </tbody>
        </table>
        {!this.state.adding && <button onClick={this.onDisplayAddingStudent}>Them hoc sinh</button>}
      </div>
    );
  }

  updateStudentField(studentId, field, value) {
    const {store} = this.context;
    const {fragments, course} = this.props;
    const actionData = {studentId, [field]: value}
    actionData._id = course._id

    return store.dispatch(updateStudentCourse(fragments.course, actionData))
  }

  renderEntry (student) {
    const {onDelete, search, display} = this.props;
    const inSearch = !search || student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if (inSearch) {
      return (
        <tr key={student.studentId}>
          <td></td>
          <td className={styles.input}>
            {student.name}
          </td>
          <td>
            <EditableTitle
              className={styles.input}
              value={student.score}
              onSubmit={this.updateStudentField.bind(this, student.studentId, 'score')}
            />
          </td>
          <td>
            <EditableTitle
              className={styles.input}
              value={student.notes}
              onSubmit={this.updateStudentField.bind(this, student.studentId, 'notes')}
            />
          </td>
          <td>
            <button onClick={this.onRemoveStudent.bind(this, student.studentId)}>Xoa</button>
          </td>
        </tr>
      );
    }
  }
}
