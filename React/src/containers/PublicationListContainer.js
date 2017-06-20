import { connect } from 'react-redux';
import { openDeletion } from '../actions/modalActions';
import { fetchPublications, fetchFeed } from '../actions/asyncActions';
import PublicationList from '../components/PublicationList';
import { withRouter } from 'react-router-dom';

const enrichPublications = (state) => {
  if (!state.publications.data) {
    return undefined;
  }

  return state.publications.data.map((pub) => {
    return {
      ...pub,
      author: state.users.data[pub.author],
      isOwn: state.currentUser.id == pub.author,
      reactions: {
        sum: pub.reactions.reduce((a, b) => (a + b), 0)
      }
    };
  });
};

const stateMapper = (state, ownProps) => {
  const { id = state.currentUser.id } = ownProps.match.params;

  return {
    id,
    fetching: state.publications.fetching,
    fetched: state.publications.fetched,
    data: enrichPublications(state),
    ...ownProps,
    isFeed: state.ui.publicationFilterType === "ALL_PUBLICATIONS",
  }
};

const dispatchMapper = (dispatch) => ({
  onDelete: (id) => dispatch(openDeletion(id)),
  fetchPublications: (id) => dispatch(fetchPublications(id)),
  fetchFeed: () => dispatch(fetchFeed()),
});

const PublicationListContainer = withRouter(connect(stateMapper, dispatchMapper)(PublicationList));

export default PublicationListContainer;
