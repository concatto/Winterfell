import { connect } from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import { search } from '../actions'
import { withRouter } from 'react-router-dom';

const stateMapper = (state, ownProps) => ({
  ...state.users[state.currentUser],
  ...ownProps,
});

const dispatchMapper = (dispatch) => ({
  onSearch: (string) => dispatch(search(string))
});

const NavigationBarContainer = withRouter(connect(stateMapper, dispatchMapper)(NavigationBar));

export default NavigationBarContainer;
