import { connect } from 'react-redux';
import { setPublicationFilter } from '../actions';
import PublicationSelector from '../components/PublicationSelector';

const stateMapper = (state) => ({
  filter: state.ui.publicationFilterType
});

const dispatchMapper = (dispatch) => ({
  onSelect: (key) => dispatch(setPublicationFilter(key))
});

const PublicationSelectorContainer = connect(stateMapper, dispatchMapper)(PublicationSelector);

export default PublicationSelectorContainer;
