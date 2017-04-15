import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PublicationPanel from './publication/publication-panel.js';

moment.locale('pt-br');

ReactDOM.render(
  <PublicationPanel/>,
  document.getElementById('app')
);
