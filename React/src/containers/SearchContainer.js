import { connect } from 'react-redux';
import Search from '../components/Search';
import { withRouter } from 'react-router-dom';

const stateMapper = (state, ownParams) => ({
    ownParams
});

export default withRouter(connect(stateMapper)(Search));