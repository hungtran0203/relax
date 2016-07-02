import Component from 'components/component';
import Content from 'shared_components/content';
import ContentDisplays from 'shared_components/content-displays';
import ContentHeader from 'shared_components/content-header';
import ContentHeaderActions from 'shared_components/content-header-actions';
import ContentNew from 'shared_components/content-new';
import ContentSearch from 'shared_components/content-search';
import Modal from 'shared_components/modal';
import ModalDelete from 'shared_components/modal-delete';
import React, {PropTypes} from 'react';

import List from './course/list';
import New from './course/new';

export default class Courses extends Component {
  static fragments = List.fragments;

  static propTypes = {
    courses: PropTypes.array.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    closeNew: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteConfirm: PropTypes.bool,
    deleteConfirmCourse: PropTypes.object,
    cancelDelete: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    deletingCourse: PropTypes.bool,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    displayChange: PropTypes.func.isRequired
  };

  render () {
    const {courses, openNew, onDelete, search, searchChange, display, displayChange} = this.props;

    return (
      <div>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <ContentNew onClick={openNew}>Mo lop</ContentNew>
            <ContentDisplays display={display} onChange={displayChange} />
          </ContentHeaderActions>
        </ContentHeader>
        <Content noPadding={display === 'list'}>
          <List
            courses={courses}
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
        <Modal small subTitle='Tao lop hoc' title='Nhap thong tin lop hoc' onClose={closeNew}>
          <New fragments={Courses.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }

  renderDeleteConfirm () {
    const {deleteConfirm, deleteConfirmCourse, cancelDelete, confirmDelete, deletingCourse} = this.props;
    if (deleteConfirm) {
      return (
        <ModalDelete
          title={`Ban co chac chan muon huy bo lop "${deleteConfirmCourse.name}"?`}
          cancel={cancelDelete}
          submit={confirmDelete}
          loading={deletingCourse}
        />
      );
    }
  }
}
