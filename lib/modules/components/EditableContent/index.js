import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class EditableContent extends Component {
  static propTypes = {
    sub: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    big: PropTypes.bool,
    EditableInput: PropTypes.func.isRequired,
    editing: PropTypes.bool,
  };

  getInitState () {
    return {
      editing: null,
    };
  }

  @bind
  async onDone () {
    const {onDone} = this.props;
    this.setEditting(false)
    await onDone()
  }

  @bind
  async onCancel () {
    const {onCancel} = this.props;
    this.setEditting(false)
    await onCancel()
  }

  @bind
  onClick () {
    this.setEditting(true)
  }

  @bind
  async onSubmit () {
    this.setEditting(false)
  }

  @bind
  toggleEdit () {
    const {editing} = this.state
    this.setEditting(!editing)
  }

  @bind
  setEditting (editing) {
    this.setState({editing})
  }

  @bind
  isEditing () {
    // @RULE: if editing props is changed, use it else use editing state
    const {editing: editingState} = this.state;

    return !!editingState;
  }

  componentWillMount () {
    const {editing} = this.props
    this.setEditting(!!editing)
  }

  componentWillReceiveProps (nextProps) {
    const {editing: prev} = this.props;
    const {editing: next} = nextProps;
    if(next !== prev) {
      this.setEditting(!!next)
    }
  }

  render () {
    const {sub, big} = this.props;
    return (
      <div className={cx(sub && styles.sub, big && styles.big)}>
        { !!this.isEditing() ? this.renderEditable() : this.renderContent()}
      </div>
    );
  }

  renderEditable () {
    const {onDone, onCancel, EditableInput} = this.props;
    return (
      <div>
        <EditableInput {...this.props} />
        {
          onDone &&
          <button className={cx(styles.formButton, styles.confirmButton)}  onClick={this.onDone} >Done</button>
        }
        {
          onCancel &&
          <button className={cx(styles.formButton, styles.cancelButton)} onClick={this.onCancel} >Cancel</button>
        }
      </div>
    )
  }
  renderContent () {
    const {displayValue} = this.props
    return (
      <button className={styles.editButton} onClick={this.onClick}>
        <div className={styles.title}>{displayValue}</div>
        <i className='nc-icon-outline ui-1_edit-74'></i>
      </button>
    )
  }
}
