import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';

const stateMapper = (state) => {
  return state.currentUser;
}

const dispatchMapper = (dispatch) => {
  return {};
}

const NavigationBarContainer = connect(stateMapper, dispatchMapper)(NavigationBar);

export default NavigationBarContainer;
