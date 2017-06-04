import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { loadMorePublications } from '../actions';

//Will be received from the router in the future
const params = {
  id: 99
};

const stateMapper = (state) => ({
  params,
  isSelf: state.currentUser == params.id
});

const dispatchMapper = (dispatch) => ({
  onScrollBottom: () => dispatch(loadMorePublications())
});

export default connect(stateMapper, dispatchMapper)(Profile);
