import { connect } from 'react-redux';
import { openDeletion } from '../actions/modalActions';
import PublicationList from '../components/PublicationList';

const collectPublications = (state) => {
  const sorter = (a, b) => state.publications[a].timestamp < state.publications[b].timestamp;

  const pubs = Object.keys(state.publications).sort(sorter).map((key) => {
    var pub = state.publications[key];

    return {
      ...pub,
      author: state.users.data[pub.author],
      isOwn: state.currentUser.id == pub.author,
      reactions: {
        sum: pub.reactions.reduce((a, b) => (a + b), 0)
      }
    };
  });

  if (state.ui.publicationFilterType === "OWN_PUBLICATIONS") {
    return pubs.filter((pub) => pub.isOwn);
  }

  return pubs;
};

const stateMapper = (state) => ({
  publications: collectPublications(state)
});

const dispatchMapper = (dispatch) => ({
  onDelete: (id) => dispatch(openDeletion(id)),
});

const PublicationListContainer = connect(stateMapper, dispatchMapper)(PublicationList);

export default PublicationListContainer;
