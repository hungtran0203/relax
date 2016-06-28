import Component from 'components/component';
import React, {PropTypes} from 'react';

import Staff from './staff.jsx';

export default class StaffContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render () {
    return (
      <Staff>
        {this.props.children}
      </Staff>
    );
  }
}
