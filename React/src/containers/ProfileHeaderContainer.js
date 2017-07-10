import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader';
import { openRename, openEditAvatar, openFollowing, openNewPublication } from '../actions/modalActions';
import { handleToggleFollowing } from '../actions/asyncActions';

const stateMapper = (state, ownProps) => ({
  ...state.users.data[ownProps.id],
  ...ownProps
});

const dispatchMapper = (dispatch) => ({
  actions: {
    onRename: (name) => dispatch(openRename(name)),
    onToggleFollowing: (id, shouldFollow) => dispatch(handleToggleFollowing(id, shouldFollow)),
    onEditAvatar: (avatar) => dispatch(openEditAvatar(avatar)),
    onSeeFollowing: (id) => dispatch(openFollowing(id)),
    onNewPublication: () => dispatch(openNewPublication()),
  }
});

const ProfileHeaderContainer = connect(stateMapper, dispatchMapper)(ProfileHeader);

export default ProfileHeaderContainer;
