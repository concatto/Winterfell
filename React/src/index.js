import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Navbar from './navbar/navbar.js';
import MainContainer from './main-container.js';
import ProfileHeader from './profile-header.js';
import PublicationSelector from './publication-selector.js';
import PublicationPanel from './publication/publication-panel.js';
import Modals from './modals.js';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {self: true};
  }

  render() {
    return (
      <div>
        <Navbar/>
        <MainContainer>
          <ProfileHeader/>
          {self &&
            <PublicationSelector/>
          }
          <PublicationPanel/>
        </MainContainer>
        {Modals.getAll()}
      </div>
    );
  }
}

moment.locale('pt-br');

ReactDOM.render(
  <Profile/>,
  document.getElementById('app')
);
