import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class ValidationProvider extends Component {
  getChildContext() {
    const getErrorFnc = (field) => {
      const {validation} = this.props;
      if(validation && validation.errors && validation.errors[field]) {
        return validation.errors[field]
      }
      return false;
    }

    return {
      validator: {
        connectProps: function (props){
          return props
        },
        hasError: (field) => {
          return getErrorFnc(field);
        },
        getError: (field) => {
          const error = getErrorFnc(field)
          if(error){
            return error['message'] || '';
          }
          return '';
        }
      }
    };
  }

  render () {
    return this.props.children;
  }
}

ValidationProvider.childContextTypes = {
  validator: React.PropTypes.object,
};
