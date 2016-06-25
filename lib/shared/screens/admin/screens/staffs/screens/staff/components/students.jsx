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
    deleteConfirmStudent: PropTypes.object,
    cancelDelete: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    deletingStudent: PropTypes.bool,
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
            <ContentNew onClick={openNew}>Dang ki moi</ContentNew>
            <ContentDisplays display={display} onChange={displayChange} />
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
    const {deleteConfirm, deleteConfirmStudent, cancelDelete, confirmDelete, deletingStudent} = this.props;
    if (deleteConfirm) {
      console.log('aaaa', deleteConfirmStudent)
      return (
        <ModalDelete
          title={`Are you sure you want to remove the student "${deleteConfirmStudent.name}"?`}
          cancel={cancelDelete}
          submit={confirmDelete}
          loading={deletingStudent}
        />
      );
    }
  }
}
