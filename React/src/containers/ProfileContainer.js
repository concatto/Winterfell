import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { loadMorePublications, displayAuthError } from '../actions';
import { fetchUser } from '../actions/asyncActions';
import { withRouter } from 'react-router-dom';

const stateMapper = (state, ownProps) => {
  if (!state.currentUser.id) {
    return {
      authorized: false
    };
  }

  const { id = state.currentUser.id } = ownProps.match.params;

  return {
    id,
    isSelf: state.currentUser.id == id,
    authorized: true,
    userData: state.users.data ? state.users.data[id] : undefined,
    error: state.users.error,
  };
};

const dispatchMapper = (dispatch) => ({
  onScrollBottom: () => dispatch(loadMorePublications()),
  onAuthFail: () => dispatch(displayAuthError()),
  fetchUser: (id) => dispatch(fetchUser(id)),
});

export default withRouter(connect(stateMapper, dispatchMapper)(Profile));
