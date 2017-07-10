import { push } from 'react-router-redux';
import { createProfileHref } from '../utils';
import Notifications from 'react-notification-system-redux';

export const setPublicationFilter = (filterType) => ({
  type: "CHANGE_PUBLICATION_FILTER",
  filterType
});

export const loadMoreFriends = () => ({
  type: "LOAD_FRIENDS"
});

export const modifyName = (name, id) => ({
  type: "MODIFY_NAME", name, id
});

export const modifyAvatar = (image, id) => ({
  type: "MODIFY_AVATAR", image, id
});

export const removePublication = (id) => ({
  type: "REMOVE_PUBLICATION", id
});

export const toggleFollowing = (id) => ({
  type: "TOGGLE_FOLLOWING", id
});

export const insertPublication = (data) => ({
  type: "INSERT_PUBLICATION", data
});

export const search = (searchString) => push("/search?q=" + searchString);
export const visitProfile = (id) => push(createProfileHref(id));

export const logOut = () => (dispatch) => {
    dispatch({type: "LOG_OUT"});
    dispatch(push("/"));
};

export const displayAuthError = () => push("/unauthorized");

const notificationOptions = {
  position: "bc",
  autoDismiss: 3,
};

export const notifySuccess = (message) => (
  Notifications.success({...notificationOptions, message})
);

export const notifyError = (message) => (
  Notifications.error({...notificationOptions, message})
);
