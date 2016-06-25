import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
import ModalDelete from 'components/modal-delete';
import React, {PropTypes} from 'react';

import List from './student/list';
import New from './student/new';

export default class Students extends Component {
  static fragments = List.fragments;

  static propTypes = {
    students: PropTypes.array.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    closeNew: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteConfirm: PropTypes.bool,
    deleteConfirmUser: PropTypes.object,
    cancelDelete: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    deletingUser: PropTypes.bool,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    displayChange: PropTypes.func.isRequired
  };

  render () {
    const {students, openNew, onDelete, search, searchChange, display, displayChange} = this.props;

    return (
      <div>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <ContentDisplays display={display} onChange={displayChange} />
            <ContentNew onClick={openNew}>Dang ki moi</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content noPadding={display === 'list'}>
          <List
            students={students}
            onDelete={onDelete}
            search={search}
            display={display}
          />
        </Content>
        {this.renderNew()}
        {this.renderDeleteConfirm()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='Dang ki moi' title='Nhap thong tin hoc sinh moi' onClose={closeNew}>
          <New fragments={Students.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }

  renderDeleteConfirm () {
    const {deleteConfirm, deleteConfirmUser, cancelDelete, confirmDelete, deletingUser} = this.props;
    if (deleteConfirm) {
      return (
        <ModalDelete
          title={`Are you sure you want to remove the student "${deleteConfirmUser.name}"?`}
          cancel={cancelDelete}
          submit={confirmDelete}
          loading={deletingUser}
        />
      );
    }
  }
}
