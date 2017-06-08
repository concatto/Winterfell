import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { loadMorePublications } from '../actions';
import { withRouter } from 'react-router-dom';

const stateMapper = (state, ownParams) => {
  const { id = state.currentUser } = ownParams.match.params;

  return {
    id,
    isSelf: state.currentUser == id,
    notifications: state.notifications,
  }
};

const dispatchMapper = (dispatch) => ({
  onScrollBottom: () => dispatch(loadMorePublications())
});

export default withRouter(connect(stateMapper, dispatchMapper)(Profile));
