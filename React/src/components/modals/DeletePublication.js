import React from 'react';
import BaseModal from './BaseModal';
import { Button } from 'react-bootstrap';

const DeletePublication = ({id, onConfirm}) => (
  <BaseModal.Wrapper>
    <BaseModal.Header>Confirmação</BaseModal.Header>

    <BaseModal.Body>
      <p>Tem certeza que deseja excluir esta publicação? Esta operação não pode ser desfeita.</p>
    </BaseModal.Body>

    <BaseModal.Footer withCancel="Cancelar">
      <Button bsStyle="danger" onClick={() => onConfirm({id})}>Excluir</Button>
    </BaseModal.Footer>
  </BaseModal.Wrapper>
);

export default DeletePublication;
