import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Navbar from './navbar/navbar.js';
import MainContainer from './main-container.js';
import ProfileHeader from './profile-header.js';
import PublicationPanel from './publication/publication-panel.js';

moment.locale('pt-br');

ReactDOM.render(
  <div>
    <Navbar/>
    <MainContainer>
      <ProfileHeader/>
      <PublicationPanel/>
    </MainContainer>
  </div>,
  document.getElementById('app')
);
