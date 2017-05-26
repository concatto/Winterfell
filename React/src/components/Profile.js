import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import ProfileHeaderContainer from '../containers/ProfileHeaderContainer';
import PublicationSelectorContainer from '../containers/PublicationSelectorContainer';
import PublicationListContainer from '../containers/PublicationListContainer';
import { Grid, Row, Col, Nav } from 'react-bootstrap';

const Profile = () => (
  <div>
    <NavigationBarContainer/>
    <Grid fluid>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          {/* Profile header */}
          <ProfileHeaderContainer/>

          {/* Publication selector (all/own only) */}
          <Nav bsStyle="pills" justified>
            <PublicationSelectorContainer type="ALL_PUBLICATIONS">
              Feed de Publicações
            </PublicationSelectorContainer>
            <PublicationSelectorContainer type="OWN_PUBLICATIONS">
              Minhas publicações
            </PublicationSelectorContainer>
          </Nav>

          <PublicationListContainer/>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Profile;
