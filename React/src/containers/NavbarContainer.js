import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const stateMapper = (state) => {
  return state.currentUser;
}

const dispatchMapper = (dispatch) => {
  return {};
}

const NavbarContainer = connect(stateMapper, dispatchMapper)(Navbar);

export default NavbarContainer;
