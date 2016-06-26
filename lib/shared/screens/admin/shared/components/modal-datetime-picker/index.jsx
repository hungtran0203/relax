import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import 'helpers/locale';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

// import 'react-widgets/lib/less/react-widgets.less';
// import './css/react-widgets.css';
import styles from './index.less';

export default class ModalInput extends Component {
  render () {
    return (
      <DateTimePicker {...this.props} />
    )
  }
}
