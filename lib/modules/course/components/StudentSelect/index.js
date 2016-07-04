import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import { Combobox } from 'react-widgets'
import {bindActionCreators} from 'redux';

@dataConnect(
  (state) => ({
    location: state.router.location,
  }),
  (dispatch) => bindActionCreators({}, dispatch),
  (props) => ({
    fragments: {
      students: {
        _id: 1,
        name: 1,
        slug: 1,
        email: 1
      }
    },
    variablesTypes: {
      students: {
        order: 'String!',
        sort: 'String!',
        search: 'String!',
        s: 'String',
      },
    },
    initialVariables: {
      students: {
        order: 'asc',
        sort: 'registerDate',
        search: 'name',
        s: '',
      },
    }
  })
)
export default class StudentSelect extends Component {
  static propTypes = {
  };

  static defaultProps = {
    students: []
  };

  getInitState () {
    return {
      name: ''
    };
  }

  @bind
  searchStudents(search='') {
    this.setState({name: search})
    const s = search.name ? search.name: search
    this.props.relate.setVariables({
      students: {
        search: 'name',
        sort: 'registerDate',
        order: 'asc',
        s,
      }
    })
    const {onChange} = this.props
    onChange && onChange(search)
  }

  @bind
  selectStudent(name) {
    const {onSelect} = this.props
    onSelect && onSelect(name)
    this.setState({name})
  }

  getValue() {
    return this.state.name
  }

  render() {
    const {students} = this.props
    return (
      <Combobox
        data={students}
        value={this.state.name}
        valueField="_id"
        textField="name"
        placeholder="Ten hoc sinh"
        onSelect={this.selectStudent}
        onChange={this.searchStudents}
        suggest
      />
    )
  }
}
