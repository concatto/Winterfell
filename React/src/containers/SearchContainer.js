import { connect } from 'react-redux';
import Search from '../components/Search';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { executeSearch } from '../actions';

const stateMapper = (state, ownParams) => {
  const query = parse(ownParams.location.search);

  return {
    searchString: query.q
  };
};

const dispatchMapper = (dispatch) => ({
  searchFor: (string) => dispatch(executeSearch(string))
});

export default withRouter(connect(stateMapper, dispatchMapper)(Search));
