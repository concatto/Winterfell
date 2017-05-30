import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader';
import { openRename, openEditAvatar, openFollowing, openNewPublication } from '../actions';

const stateMapper = (state, ownProps) => ({
  ...state.users[ownProps.params.id],
  isSelf: ownProps.params.id == state.currentUser,
});

const dispatchMapper = (dispatch) => ({
  actions: {
    onRename: (name) => dispatch(openRename(name)),
    onToggleFollowing: () => dispatch({type: "TOGGLE"}),
    onEditAvatar: () => dispatch(openEditAvatar()),
    onSeeFollowing: () => dispatch(openFollowing()),
    onNewPublication: () => dispatch(openNewPublication()),
  }
});

const ProfileHeaderContainer = connect(stateMapper, dispatchMapper)(ProfileHeader);

export default ProfileHeaderContainer;
