import { connect } from 'react-redux';
import Search from '../components/Search';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { handleSearch } from '../actions/asyncActions';

const stateMapper = (state, ownParams) => {
  const query = parse(ownParams.location.search);

  return {
    searchString: query.q,
    results: state.search.results,
    working: state.search.working,
  };
};

const dispatchMapper = (dispatch) => ({
  searchFor: (string) => dispatch(handleSearch(string))
});

export default withRouter(connect(stateMapper, dispatchMapper)(Search));
