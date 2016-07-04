import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import { omit } from 'lodash'
import styles from './index.less';

import { DateTimePicker } from 'react-widgets';
import 'root_lib/helpers/locale';

import EditableContent from '../EditableContent'
import moment from 'moment'

export default class EditableDateTime extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.required,
  };

  getInitState () {
    return {
      editing: false,
      editingValue: null,
    };
  }

  @bind
  onClick () {
    this.setState({
      editing: true,
      editValue: this.props.value
    });
  }

  @bind
  async onChange (date: Date, dateStr: string) {
    const {onSubmit} = this.props;
    if (onSubmit) {
      await onSubmit(date.getTime())
    }
    this.editableRef.setEditting(false)
    this.setValue(date.getTime())
  }

  @bind
  onSelect (date: Date) {
    this.editableRef.setEditting(false)
  }

  @bind
  onToggle (isOpen) {

  }

  getValue () {
    const {editingValue} = this.state
    const {value} = this.props

    return editingValue === null? value : editingValue;
  }

  setValue (value) {
    this.setState({editingValue: value})
  }

  render () {
    const rawValue = this.getValue()
    const value = moment(rawValue ? rawValue : {})

    const {format="DD/MM/YYYY"} = this.props
    const {editing, time, calendar} = this.props
    let defaultOpen
    if(editing) {
      defaultOpen = !editing
    } else if (time){
      defaultOpen = 'time'
    } else {
      defaultOpen = 'calendar'
    }

    // prepare editable props
    const editableProps = {
      EditableInput: DateTimePicker,
      onChange: this.onChange,
      onSelect: this.onSelect,
      displayValue: value.format(format),
      value: value.toDate(),
      format,
      defaultOpen,
    }

    const props = omit(this.props, Object.keys(editableProps))
    return (
      <EditableContent
        {...props} {...editableProps} ref={(ele) => { this.editableRef = ele }}/>
    )
  }
}
