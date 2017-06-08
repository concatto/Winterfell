import React from 'react';
import { connect } from 'react-redux';
import { handleModalConfirmation, hideModal } from '../actions';
import BaseModal from '../components/modals/BaseModal';

const ModalRoot = ({modals, modalType, modalProps, onConfirm, onHide, onClose, shown, busy}) => {
  const SpecializedModal = modals[modalType];

  //If there is no modal to be shown, return an empty element
  if (SpecializedModal === undefined) {
    return null;
  }

  //Replace the dispatch functions, specifying the modal type
  modalProps = {
    ...modalProps,
    busy,
    onConfirm: (payload) => onConfirm(modalType, payload),
    onHide: () => onHide(modalType),
  };

  return (
    <BaseModal baseProps={SpecializedModal.baseProps} onHide={() => onHide(modalType)} shown={shown}>
      <SpecializedModal {...modalProps}/>
    </BaseModal>
  );
};


const stateMapper = (state) => ({
  modalProps: state.modal.payload,
  modalType: state.modal.type,
  shown: state.modal.shown,
  busy: state.modal.busy,
});

const dispatchMapper = (dispatch) => ({
  onConfirm: (type, payload) => dispatch(handleModalConfirmation(type, payload)),
  onHide: (type) => dispatch(hideModal(type)),
});

export default connect(stateMapper, dispatchMapper)(ModalRoot);
