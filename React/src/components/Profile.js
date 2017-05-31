import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import ProfileHeaderContainer from '../containers/ProfileHeaderContainer';
import PublicationSelectorContainer from '../containers/PublicationSelectorContainer';
import PublicationListContainer from '../containers/PublicationListContainer';
import ModalRoot from '../containers/ModalRoot';
import { Grid, Row, Col, Nav } from 'react-bootstrap';

export default class Profile extends React.Component {
  componentDidMount() {
    document.addEventListener("scroll", () => {
      const height = document.body.scrollTop + window.innerHeight;

      if (document.body.scrollHeight === height) {
        this.props.onScrollBottom();
      }
    });
  }

  render() {
    const { params, isSelf } = this.props;

    return (
      <div>
        <NavigationBarContainer/>
        <Grid fluid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {/* Profile header */}
              <ProfileHeaderContainer isSelf={isSelf} params={params}/>

              {/* Publication selector (all/own only) */}
              {isSelf &&
                <PublicationSelectorContainer/>
              }

              <PublicationListContainer/>
              <ModalRoot/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
