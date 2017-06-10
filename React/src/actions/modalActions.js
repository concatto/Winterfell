import { visitProfile } from './index';
import { handleRename, handleDeletion, handleEditAvatar } from './asyncActions';

const confirmHandlers = {
  "RENAME": handleRename,
  "DELETION": handleDeletion,
  "EDIT_AVATAR": handleEditAvatar,
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

export const openFollowing = (id) => {
  return (dispatch, getState) => {
    const following = getState().users[id].following.map((followingId) => {
      return getState().users[followingId];
    });

    dispatch(openModal("FOLLOWING", {following}));
  }
}

export const openDeletion = (id) => openModal("DELETION", {id});
export const openRename = (name) => openModal("RENAME", {name});
export const openNewPublication = () => openModal("NEW_PUBLICATION");
export const openEditAvatar = (avatar) => openModal("EDIT_AVATAR", {avatar});
