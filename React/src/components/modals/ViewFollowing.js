import React from 'react';
import BaseModal from './BaseModal';
import PersonListContainer from '../../containers/PersonListContainer';

const ViewFollowing = ({following}) => (
  <BaseModal.Wrapper>
    <BaseModal.Header>Pessoas que você segue</BaseModal.Header>

    <BaseModal.Body maximumHeight={400}>
      <PersonListContainer data={following} className="following-list"/>
    </BaseModal.Body>

    <BaseModal.Footer withCancel="Fechar"></BaseModal.Footer>
  </BaseModal.Wrapper>
);

export default ViewFollowing;
