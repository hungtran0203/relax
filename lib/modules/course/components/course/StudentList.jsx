import Component from 'components/component';
import React, {PropTypes} from 'react';
import bind from 'decorators/bind';
import { addStudentToCourse, removeStudentFromCourse } from '../../actions/course';
import { pick } from 'lodash'

export default class StudentList extends Component {
  static propTypes = {
    course: PropTypes.array.isRequired,
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState(){
    return {
      adding: false,
      ...this.getDefaultStudent(),
    }
  }

  getDefaultStudent(){
    return {
      name: '',
      score: '',
      notes: '',
    }
  }

  onChangeField(field, value) {
    this.setState({field: value})
  }

  renderAddingStudent(){
    const {adding} = this.state
    if(!adding) return null
    return (
      <tr>
        <td></td>
        <td>
          <input
            onChange={this.onChangeField.bind(this, 'name')}
            type="text"
            value={this.state.name}
            placeholder="Ten hoc sinh"
          />
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
          <button onClick={this.onAddStudent}>Ok</button>
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
    const actionData = pick(this.state, ['name', 'score', 'notes'])
    actionData._id = course._id

    store.dispatch(addStudentToCourse(fragments.course, actionData))
    .then((result) => {
      this.setState({
        adding: false,
        ...this.getDefaultStudent(),
      })
    })

  }

  onRemoveStudent(name){
    const {store} = this.context;
    const {fragments, course} = this.props;
    const actionData = {name}
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
            <th>#</th>
            <th>Name</th>
            <th>Diem xep lop</th>
            <th>Ghi chu</th>
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

  renderEntry (student) {
    const {onDelete, search, display} = this.props;
    const inSearch = !search || student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if (inSearch) {
      return (
        <tr key={student._id}>
          <td></td>
          <td>{student.name}</td>
          <td>{student.score}</td>
          <td>{student.notes}</td>
          <td>
            <button onClick={this.onRemoveStudent.bind(this, student.name)}>Xoa</button>
          </td>
        </tr>
      );
    }
  }
}
