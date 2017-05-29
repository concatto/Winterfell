import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader';
import { openRename } from '../actions';

const stateMapper = (state) => {
  return state.users[state.currentUser];
}

const dispatchMapper = (dispatch) => ({
  onRename: (name) => dispatch(openRename(name))
});

const ProfileHeaderContainer = connect(stateMapper, dispatchMapper)(ProfileHeader);

export default ProfileHeaderContainer;
