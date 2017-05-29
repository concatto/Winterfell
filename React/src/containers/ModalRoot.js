import React from 'react';
import { connect } from 'react-redux';
import { handleModalConfirmation, hideModal } from '../actions';
import DeletePublication from '../components/modals/DeletePublication';
import RenameUser from '../components/modals/RenameUser';
import BaseModal from '../components/modals/BaseModal';

const MODALS = {
  "DELETION": DeletePublication,
  "RENAME": RenameUser
};


const ModalRoot = ({modalType, modalProps, onConfirm, onHide}) => {
  const SpecializedModal = MODALS[modalType];

  if (SpecializedModal === undefined) {
    return <span></span>
  }

  //Replace the dispatch functions, specifying the modal type
  modalProps = {
    ...modalProps,
    onConfirm: (payload) => onConfirm(modalType, payload),
  };

  return (
    <BaseModal onHide={() => onHide(modalType)}>
      <SpecializedModal {...modalProps}/>
    </BaseModal>
  );
};


const stateMapper = (state) => ({
  modalProps: state.modal.payload,
  modalType: state.modal.type,
});

const dispatchMapper = (dispatch) => ({
  onConfirm: (type, payload) => dispatch(handleModalConfirmation(type, payload)),
  onHide: (type) => dispatch(hideModal(type))
});

export default connect(stateMapper, dispatchMapper)(ModalRoot);
