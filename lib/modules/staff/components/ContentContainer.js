import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import StudentList from 'modules/student/components/StudentList';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({addTab}, dispatch),
)
export default class PageContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    pageId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  };

  getInitState () {
    this.processTab(this.props);
    return {
      sidebar: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pageId !== nextProps.pageId && nextProps.pageId) {
      this.setState({
        sidebar: null
      });
      this.props.relate.refresh(nextProps);
    }

    const oldBuild = this.props.location.query.build;
    const currentBuild = nextProps.location.query.build;
    if (oldBuild !== currentBuild || this.props.pageId !== nextProps.pageId) {
      this.processTab(nextProps);
    }
  }

  processTab (props) {
    const currentBuild = props.location.query.build;
    if (currentBuild) {
      this.props.addTab('page', props.pageId);
    }
  }

  renderStudentPage(){
    return (
      <StudentList />
    )
  }
  render () {
    const {location, loading, pageId} = this.props;
    switch (pageId) {
      case 'students':
        return this.renderStudentPage();
        break;
      default:
        return (<div> Nothing here</div>)
    }
  }
}
