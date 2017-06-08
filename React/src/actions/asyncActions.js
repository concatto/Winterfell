import Notifications from 'react-notification-system-redux';

export const startAsync = () => ({
  type: "ASYNC_START"
});

export const finishAsync = (outcome, payload) => ({
  type: "ASYNC_FINISH", outcome, payload
});

export const handleRename = (payload) => (dispatch) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Renomeado com sucesso"));
  }, 1000);
};

export const handleDeletion = (payload) => (dispatch) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Publicação excluída com sucesso."));
  }, 1000);
}

const notificationOptions = {
  position: "bc",
  autoDismiss: 2,
};

const notifySuccess = (message) => (
  Notifications.success({...notificationOptions, message})
);
