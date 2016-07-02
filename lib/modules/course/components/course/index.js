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
    courseId: state.router.params.id,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({addTab}, dispatch),
  (props) => ({
    fragments: Info.fragments,
    variablesTypes: {
      course: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      course: {
        _id: props.courseId
      }
    }
  })
)
export default class CourseContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    courseId: PropTypes.string.isRequired,
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
          <Link to={`/admin/staffs/courses`} >
            Quay lai
          </Link>
          </ContentHeaderActions>
        </ContentHeader>
        <Content >
          <Info course={this.props.course} display="grid"/>
        </Content>
      </div>
    )
  }
}
