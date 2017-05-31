import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import { search } from '../actions'

const stateMapper = (state) => {
  return state.users[state.currentUser];
};

const dispatchMapper = (dispatch) => ({
  onSearch: (string) => dispatch(search(string))
});

const NavigationBarContainer = connect(stateMapper, dispatchMapper)(NavigationBar);

export default NavigationBarContainer;
