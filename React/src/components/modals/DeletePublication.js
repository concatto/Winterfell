import React from 'react';
import BaseModal from './BaseModal';

const DeletePublication = ({id, onConfirm}) => (
  <BaseModal.Wrapper>
    <BaseModal.Header>Confirmação</BaseModal.Header>

    <BaseModal.Body>
      <p>Tem certeza que deseja excluir esta publicação? Esta operação não pode ser desfeita.</p>
    </BaseModal.Body>

    <BaseModal.Footer withCancel="Cancelar">
      <BaseModal.ConfirmButton bsStyle="danger" onClick={() => onConfirm({id})}>
        Excluir
      </BaseModal.ConfirmButton>
    </BaseModal.Footer>
  </BaseModal.Wrapper>
);

export default DeletePublication;
