import { connect } from 'react-redux';
import Profile from '../components/Profile';

//Will be received from the router in the future
const params = {
  id: 30
};

const stateMapper = (state) => ({
  params,
  isSelf: state.currentUser == params.id
});

const dispatchMapper = (dispatch) => ({
  onScrollBottom: () => store.dispatch(loadMore())
});

export default connect(stateMapper, dispatchMapper)(Profile);
