import { connect } from 'react-redux';
import { visitProfile } from '../actions';
import PersonList from '../components/PersonList';

const stateMapper = (state, ownProps) => ({
  ...ownProps
});

const dispatchMapper = (dispatch) => ({
  visitProfile: (id) => dispatch(visitProfile(id))
});

export default connect(stateMapper, dispatchMapper)(PersonList);
