import { push } from 'react-router-redux';
import { createProfileHref } from '../utils';

export const setPublicationFilter = (filterType) => ({
  type: "CHANGE_PUBLICATION_FILTER",
  filterType
});

const openModal = (type, payload) => ({
  type: `OPEN_${type}_MODAL`,
  payload
});

export const hideModal = (type) => ({
  type: `HIDE_${type}_MODAL`
});

export const closeModal = (type) => ({
  type: `CLOSE_${type}_MODAL`
});

export const confirmModal = (type, payload) => ({
  type: `CONFIRM_${type}_MODAL`,
  payload
});

export const openDeletion = (id) => openModal("DELETION", {id});
export const openRename = (name) => openModal("RENAME", {name});
export const openNewPublication = () => openModal("NEW_PUBLICATION");
export const openEditAvatar = (avatar) => openModal("EDIT_AVATAR", {avatar});

export const openFollowing = (id) => {
  return (dispatch, getState) => {
    const following = getState().users[id].following.map((followingId) => {
      return getState().users[followingId];
    });

    const navigateTo = (id) => dispatch(visitProfile(id));
    dispatch(openModal("FOLLOWING", {following, navigateTo}));
  }
}

export const handleModalConfirmation = (type, payload) => {
  return confirmModal(type, payload);
};

//Will use thunk eventually
export const loadMorePublications = () => ({
  type: "LOAD_PUBLICATIONS"
});

export const loadMoreFriends = () => ({
  type: "LOAD_FRIENDS"
})

export const search = (searchString) => push("/search?q=" + searchString);
export const visitProfile = (id) => push(createProfileHref(id));

//Dispatch a request to the API eventually
export const executeSearch = (searchString) => ({
  type: "DO_SEARCH",
  searchString
});
