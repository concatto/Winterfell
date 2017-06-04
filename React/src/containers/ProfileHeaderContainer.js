import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader';
import { openRename, openEditAvatar, openFollowing, openNewPublication } from '../actions';

const stateMapper = (state, ownProps) => ({
  ...state.users[ownProps.params.id],
  ...ownProps
});

const dispatchMapper = (dispatch) => ({
  actions: {
    onRename: (name) => dispatch(openRename(name)),
    onToggleFollowing: () => dispatch({type: "TOGGLE_FOLLOWING"}),
    onEditAvatar: (avatar) => dispatch(openEditAvatar(avatar)),
    onSeeFollowing: (id) => dispatch(openFollowing(id)),
    onNewPublication: () => dispatch(openNewPublication()),
  }
});

const ProfileHeaderContainer = connect(stateMapper, dispatchMapper)(ProfileHeader);

export default ProfileHeaderContainer;
