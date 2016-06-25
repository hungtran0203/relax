import Component from 'components/component';
import New from 'components/new-page';
import React, {PropTypes} from 'react';

import styles from './staff.less';

export default class Staff extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render () {
    let result;
    if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }
    return result;
  }

  renderEmpty () {
    return (
      <div className={styles.empty}>
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.emptyText}>Chon chuc nang quan li trong menu ben trai</div>
      </div>
    );
  }
}
