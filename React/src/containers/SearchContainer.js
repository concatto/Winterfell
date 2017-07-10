import { connect } from 'react-redux';
import Search from '../components/Search';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { handleSearch } from '../actions/asyncActions';

const stateMapper = (state, ownParams) => {
  const query = parse(ownParams.location.search);

  return {
    searchString: query.q,
    results: state.search.results ? state.search.results.map((item) => state.users.data[item]) : [],
    working: state.search.working,
    totalResults: state.search.totalResults || 0,
  };
};

const dispatchMapper = (dispatch) => ({
  searchFor: (string, offset, limit) => dispatch(handleSearch(string, offset, limit))
});

export default withRouter(connect(stateMapper, dispatchMapper)(Search));
