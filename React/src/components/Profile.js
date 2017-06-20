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
  }

  componentWillMount() {
    if (!this.props.authorized) {
      this.props.onAuthFail();
    }
  }

  shouldFetch(props) {
    const val = !props.isSelf && (!props.userData || !props.userData.id) && this.props.authorized;
    console.log(props);
    console.log(val);
    return val;
  }

  componentDidMount() {
    if (this.shouldFetch(this.props)) {
      this.props.fetchUser(this.props.id);
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  getContent() {
    const { id, isSelf, userData } = this.props;

    if (!userData) {
      return null;
    }

    if (userData.fetching) {
      return <div className="center-block"><div className="loader"></div></div>;
    } else if (userData.fetched && userData.id) {
      return (
        <div>
          <ProfileHeaderContainer isSelf={isSelf} id={id}/>

          {isSelf &&
            <PublicationSelectorContainer/>
          }
        </div>
      );
    } else {
      return <div className="text-center"><h2>Non ecziste</h2></div>;
    }
  }

  render() {
    const { id, isSelf, notifications, authorized } = this.props;

    if (!authorized) {
      return null;
    }

    return (
      <div>
        <NavigationBarContainer withSearch/>
        <Grid fluid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {this.getContent()}

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
