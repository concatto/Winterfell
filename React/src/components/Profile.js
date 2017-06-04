import React from 'react';
import PublicationSelectorContainer from '../containers/PublicationSelectorContainer';
import PublicationListContainer from '../containers/PublicationListContainer';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import ProfileHeaderContainer from '../containers/ProfileHeaderContainer';
import ModalRoot from '../containers/ModalRoot';
import DeletePublication from '../components/modals/DeletePublication';
import NewPublication from '../components/modals/NewPublication';
import ViewFollowing from '../components/modals/ViewFollowing';
import ChangeAvatar from '../components/modals/ChangeAvatar';
import RenameUser from '../components/modals/RenameUser';
import BaseModal from '../components/modals/BaseModal';
import { Grid, Row, Col, Nav } from 'react-bootstrap';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.modals = {
      "DELETION": DeletePublication,
      "RENAME": RenameUser,
      "FOLLOWING": ViewFollowing,
      "EDIT_AVATAR": ChangeAvatar,
      "NEW_PUBLICATION": NewPublication,
    };
  }

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
              <ModalRoot modals={this.modals}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
