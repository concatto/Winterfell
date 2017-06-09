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
import Notifications from 'react-notification-system-redux';

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

    this.scrollHandler = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    const height = document.body.scrollTop + window.innerHeight;

    if (document.body.scrollHeight === height) {
      this.props.onScrollBottom();
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { id, isSelf, notifications } = this.props;

    return (
      <div>
        <NavigationBarContainer withSearch/>
        <Grid fluid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {/* Profile header */}
              <ProfileHeaderContainer isSelf={isSelf} id={id}/>

              {/* Publication selector (all/own only) */}
              {isSelf &&
                <PublicationSelectorContainer/>
              }

              <PublicationListContainer className={isSelf ? "in-self" : ""}/>
              <ModalRoot modals={this.modals}/>
            </Col>
          </Row>
        </Grid>

        <Notifications notifications={notifications}/>
      </div>
    );
  }
}
