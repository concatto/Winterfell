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

export const confirmModal = (type, payload) => ({
  type: `CONFIRM_${type}_MODAL`,
  payload
});

export const openDeletion = (id) => openModal("DELETION", {id});
export const openRename = (name) => openModal("RENAME", {name});
export const openNewPublication = () => openModal("NEW_PUBLICATION");
export const openFollowing = () => openModal("FOLLOWING");
export const openEditAvatar = () => openModal("EDIT_AVATAR");

export const handleModalConfirmation = (type, payload) => {
  return (dispatch) => {
    dispatch(confirmModal(type, payload));
  }
};

//Will use thunk eventually
export const loadMore = () => ({
  type: "LOAD_PUBLICATIONS"
});

export const search = (searchString) => ({
  type: "DO_SEARCH",
  searchString
});
