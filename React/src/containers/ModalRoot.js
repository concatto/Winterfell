import React from 'react';
import { connect } from 'react-redux';
import { handleModalConfirmation, hideModal } from '../actions';
import BaseModal from '../components/modals/BaseModal';

const ModalRoot = ({modals, modalType, modalProps, onConfirm, onHide}) => {
  const SpecializedModal = modals[modalType];

  //If there is no modal to be shown, return an empty element
  if (SpecializedModal === undefined) {
    return <span></span>
  }

  //Replace the dispatch functions, specifying the modal type
  modalProps = {
    ...modalProps,
    onConfirm: (payload) => onConfirm(modalType, payload),
  };

  return (
    <BaseModal modalProps={SpecializedModal.modalProps} onHide={() => onHide(modalType)}>
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
