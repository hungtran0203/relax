import bind from 'decorators/bind';
import Component from 'components/component';
import ContentHeader from 'shared_components/content-header';
import ContentHeaderActions from 'shared_components/content-header-actions';
import Content from 'shared_components/content';
import ContentLoading from 'shared_components/content-loading';
import React, {PropTypes} from 'react';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {Link} from 'react-router';
import Info from './info';

@dataConnect(
  (state) => ({
    studentId: state.router.params.id,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({addTab}, dispatch),
  (props) => ({
    fragments: Info.fragments,
    variablesTypes: {
      student: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      student: {
        _id: props.studentId
      }
    }
  })
)
export default class StudentContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  render () {
    const {loading} = this.props;
    if(loading) {
      return (
        <ContentLoading />
      )
    }
    return (
      <div>
        <ContentHeader>
          <ContentHeaderActions>
          <Link to={`/admin/staffs/students`} >
            Quay lai
          </Link>
          </ContentHeaderActions>
        </ContentHeader>
        <Content >
          <Info student={this.props.student} display="grid"/>
        </Content>
      </div>
    )
  }
}
