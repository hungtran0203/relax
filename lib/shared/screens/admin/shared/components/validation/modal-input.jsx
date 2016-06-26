import bind from 'decorators/bind';
import Component from 'components/component';
import ModalInput from '../modal-input';
import React, {PropTypes} from 'react';

export default class Input extends Component {

  render () {
    const {field} = this.props;
    const error = this.context.validator.hasError(field);
    const props = this.context.validator.connectProps(this.props);
    if(error) {
      return (
        <div>
          <ModalInput {...props} />
          {this.context.validator.getError(field)}
        </div>
      )
    } else {
      return (
        <ModalInput {...this.props} />
      )
    }
  }
}

Input.contextTypes = {
  validator: React.PropTypes.object,
};
