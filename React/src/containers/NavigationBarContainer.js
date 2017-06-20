import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import { search, logOut } from '../actions';
import { fetchUser } from '../actions/asyncActions';
import { withRouter } from 'react-router-dom';

const stateMapper = (state, ownProps) => {
  if (!state.users.data[state.currentUser.id]) {
    return {
      ...ownProps,
      id: state.currentUser.id,
      avatar: null,
      name: "",
    }
  }
  
  return {
    ...state.users.data[state.currentUser.id],
    ...ownProps,
  }
};

const dispatchMapper = (dispatch) => ({
  onSearch: (string) => dispatch(search(string)),
  onLogout: () => dispatch(logOut()),
  fetchUser: (id) => dispatch(fetchUser(id)),
});

const NavigationBarContainer = withRouter(connect(stateMapper, dispatchMapper)(NavigationBar));

export default NavigationBarContainer;
