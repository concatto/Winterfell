import { visitProfile } from './index';
import { handleRename, handleDeletion, handleEditAvatar, handleNewPublication } from './asyncActions';

const confirmHandlers = {
  "RENAME": handleRename,
  "DELETION": handleDeletion,
  "EDIT_AVATAR": handleEditAvatar,
  "NEW_PUBLICATION": handleNewPublication
};

export const confirmModal = (type, payload) => {
  return (dispatch) => {
    dispatch({type: `CONFIRM_${type}_MODAL`, payload});

    const handler = confirmHandlers[type];
    if (handler) {
      dispatch(handler(payload));
    }
  };
};

export const handleModalConfirmation = (type, payload) => {
  return confirmModal(type, payload);
};

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

export const openFollowing = (id) => openModal("FOLLOWING", {id});
export const openDeletion = (id) => openModal("DELETION", {id});
export const openRename = (name) => openModal("RENAME", {name});
export const openNewPublication = () => openModal("NEW_PUBLICATION");
export const openEditAvatar = (avatar) => openModal("EDIT_AVATAR", {avatar});
