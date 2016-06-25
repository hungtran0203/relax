import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';

export default class NewPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    changeTitle: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  render () {
    const {title, changeTitle, submit, loading} = this.props;
    return (
      <ModalNew submit={submit} loading={loading}>
        <ModalInput
          focus
          value={title}
          placeholder='Ho va ten'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Ngay sinh'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Ten phu huynh'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Dien thoai lien he'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Ngay dang ky'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Email'
          onChange={changeTitle}
        />
        <ModalInput
          value={title}
          placeholder='Ghi chu'
          onChange={changeTitle}
        />
      </ModalNew>
    );
  }
}
