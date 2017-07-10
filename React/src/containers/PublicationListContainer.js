import { connect } from 'react-redux';
import { openDeletion, openReactions } from '../actions/modalActions';
import { fetchPublications } from '../actions/asyncActions';
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
        data: pub.reactions,
        sum: pub.reactions.reduce((a, b) => (a + b), 0)
      }
    };
  });
};

const stateMapper = (state, ownProps) => {
  const { id = state.currentUser.id } = ownProps.match.params;
  const isUser = id == state.currentUser.id;

  return {
    id,
    isUser,
    fetching: state.publications.fetching,
    fetched: state.publications.fetched,
    data: enrichPublications(state),
    isFeed: state.ui.publicationFilterType === "ALL_PUBLICATIONS" && isUser,
    ended: state.publications.ended,
    error: state.publications.error,
    ...ownProps,
  }
};

const actions = {openDeletion, openReactions, fetchPublications};
const PublicationListContainer = withRouter(connect(stateMapper, actions)(PublicationList));

export default PublicationListContainer;
