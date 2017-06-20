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
  
  componentWillMount() {
    if (!this.props.authorized) {
      this.props.onAuthFail();
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.id);
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
  
  componentWillUpdate(props) {
    if (!props.userData) {
      props.fetchUser(props.id);
    }
  }
  
  getContent() {
    const { id, isSelf, userData } = this.props;
    console.log(this.props);
    
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

          <PublicationListContainer className={isSelf ? "in-self" : ""}/>
        </div>
      );
    } else {
      return <h2>Non ecziste</h2>
    }
  }

  render() {
    const { id, isSelf, notifications } = this.props;

    if (!id) {
      return null;
    }
    
    return (
      <div>
        <NavigationBarContainer withSearch/>
        <Grid fluid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {this.getContent()}
              
              <ModalRoot modals={this.modals}/>
            </Col>
          </Row>
        </Grid>

        <Notifications notifications={notifications}/>
      </div>
    );
  }
}
