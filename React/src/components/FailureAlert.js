import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FailureAlert = ({error}) => (
  <Alert bsStyle="danger">
    <h4><strong>Falha na comunicação com o servidor.</strong></h4>
    <p>Foi impossível estabelecer uma conexão com a base de dados.</p>
    <br/>
    <p style={{marginBottom: 10}}>Mensagem de erro:</p>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </Alert>
);

export default FailureAlert;
