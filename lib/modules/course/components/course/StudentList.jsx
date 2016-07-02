import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class StudentList extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  };

  render () {
    const {students} = this.props;
    return (
      <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Diem xep lop</th>
        <th>Ghi chu</th>
      </thead>
      <tbody>
        {students.map(this.renderEntry, this)}
      </tbody>
      </table>
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
        </tr>
      );
    }
  }
}
