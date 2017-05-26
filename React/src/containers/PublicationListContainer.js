import { connect } from 'react-redux';
import PublicationList from '../components/PublicationList';

const collectPublications = (state) => {
  const pubs = Object.keys(state.publications).map((key) => {
    var pub = state.publications[key];

    return {
      ...pub,
      author: state.users[pub.author],
      isOwn: state.currentUser == pub.author,
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

});

const PublicationListContainer = connect(stateMapper, dispatchMapper)(PublicationList);

export default PublicationListContainer;
