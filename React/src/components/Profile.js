import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import ProfileHeaderContainer from '../containers/ProfileHeaderContainer';

const Profile = () => (
  <div>
    <NavbarContainer/>
    <div className="container-fluid below-navigation">
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2">
          <ProfileHeaderContainer/>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
