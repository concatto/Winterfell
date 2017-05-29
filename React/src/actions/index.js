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

export const handleModalConfirmation = (type, payload) => {
  return (dispatch) => {
    dispatch(confirmModal(type, payload));
  }
};
