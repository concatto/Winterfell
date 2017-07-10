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
import Reactions from '../components/modals/Reactions';
import BaseModal from '../components/modals/BaseModal';
import { Grid, Row, Col, Nav } from 'react-bootstrap';
import Notifications from 'react-notification-system-redux';
import FailureAlert from './FailureAlert';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.modals = {
      "DELETION": DeletePublication,
      "REACTIONS": Reactions,
      "RENAME": RenameUser,
      "FOLLOWING": ViewFollowing,
      "EDIT_AVATAR": ChangeAvatar,
      "NEW_PUBLICATION": NewPublication,
    };
  }

  componentWillMount() {
    if (!this.props.authorized) {
      this.props.onAuthFail();
    }
  }

  shouldFetch(props) {
    //If I am not myself and there is no data about me and I am authorized, fetch!
    //CHANGED: Fetch even if there is data. Make sure the data is updated.
    const val = (!props.userData || !props.userData.fetching) && /* (!props.userData || !props.userData.id) && */ this.props.authorized;
    //If I am myself, then the data is going to be fetched by the NavigationBar.
    return val;
  }

  componentDidMount() {
    if (this.shouldFetch(this.props)) {
      this.props.fetchUser(this.props.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0); //Go back to the beginning of the page
    }

    if (this.props.id != prevProps.id && this.shouldFetch(this.props)) {
      this.props.fetchUser(this.props.id); //If we're looking at a different profile, fetch it!
    }
  }

  getContent() {
    const { id, isSelf, userData, error } = this.props;

    if (!userData) {
      return null;
    }

    if (error) {
      return <FailureAlert error={error}/>
    } else if (userData.fetching) {
      return <div className="center-block"><div className="loader"></div></div>;
    } else if (userData.fetched && userData.id) {
      return (
        <div>
          <ProfileHeaderContainer isSelf={isSelf} id={id}/>
        </div>
      );
    } else {
      return <div className="text-center"><h2>Este perfil não existe.</h2></div>;
    }
  }

  render() {
    const { id, notifications, authorized, isSelf } = this.props;

    if (!authorized) {
      return null;
    }

    return (
      <div>
        <NavigationBarContainer withSearch/>
        <Grid fluid className="main">
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {this.getContent()}

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
