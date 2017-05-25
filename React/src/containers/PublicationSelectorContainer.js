import { connect } from 'react-redux';
import { setPublicationFilter } from '../actions';
import PublicationSelector from '../components/PublicationSelector';

const stateMapper = (state, ownProps) => ({
  active: ownProps.type === state.ui.publicationFilterType
});

const dispatchMapper = (dispatch, ownProps) => ({
  onClick: () => dispatch(setPublicationFilter(ownProps.type))
});

const PublicationSelectorContainer = connect(stateMapper, dispatchMapper)(PublicationSelector);

export default PublicationSelectorContainer;
