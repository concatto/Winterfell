import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader';

const stateMapper = (state) => {
  return state.currentUser;
}

const dispatchMapper = (dispatch) => {
  return {};
}

const ProfileHeaderContainer = connect(stateMapper, dispatchMapper)(ProfileHeader);

export default ProfileHeaderContainer;
