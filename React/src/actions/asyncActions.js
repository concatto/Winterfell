import Notifications from 'react-notification-system-redux';
import { modifyName, modifyAvatar, removePublication } from './index';

export const startAsync = () => ({
  type: "ASYNC_START"
});

export const finishAsync = (outcome) => ({
  type: "ASYNC_FINISH", outcome
});

export const handleRename = ({name}) => (dispatch, getState) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Seu nome foi alterado com sucesso."));
    dispatch(modifyName(name, getState().currentUser));
  }, 1000);
};

export const handleDeletion = ({id}) => (dispatch) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Publicação excluída com sucesso."));
    dispatch(removePublication(id));
  }, 1000);
}

export const handleEditAvatar = ({image}) => (dispatch, getState) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Sua imagem foi alterada com sucesso."));
    dispatch(modifyAvatar(image, getState().currentUser));
  }, 1000);
}

export const handleSearch = (searchString) => (dispatch, getState) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));

    dispatch({
      type: "SEARCH_SUCCESS",
      payload: Object.values(getState().users)
    });
  }, 1000);
}

const notificationOptions = {
  position: "bc",
  autoDismiss: 2,
};

const notifySuccess = (message) => (
  Notifications.success({...notificationOptions, message})
);
