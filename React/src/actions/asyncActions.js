import { modifyName, modifyAvatar, removePublication, insertPublication, notifySuccess } from './index';

export const startAsync = (name, payload) => ({
  type: name + "_START", payload
});

export const finishAsync = (name, outcome, payload) => ({
  type: name + "_FINISH", outcome, payload
});

export const handleRename = ({name}) => (dispatch, getState) => {
  dispatch(startAsync("M_RENAME"));
  setTimeout(() => {
    dispatch(finishAsync("M_RENAME", "SUCCESS"));
    dispatch(notifySuccess("Seu nome foi alterado com sucesso."));
    dispatch(modifyName(name, getState().currentUser.id));
  }, 1000);
};

export const handleDeletion = ({id}) => (dispatch) => {
  dispatch(startAsync("M_DELETION"));
  setTimeout(() => {
    dispatch(finishAsync("M_DELETION", "SUCCESS"));
    dispatch(notifySuccess("Publicação excluída com sucesso."));
    dispatch(removePublication(id));
  }, 1000);
}

export const handleEditAvatar = ({image}) => (dispatch, getState) => {
  dispatch(startAsync("M_EDIT_AVATAR"));
  setTimeout(() => {
    dispatch(finishAsync("M_EDIT_AVATAR", "SUCCESS"));
    dispatch(notifySuccess("Sua imagem foi alterada com sucesso."));
    dispatch(modifyAvatar(image, getState().currentUser.id));
  }, 1000);
}

export const handleSearch = (searchString) => (dispatch, getState) => {
  dispatch(startAsync("SEARCH"));
  setTimeout(() => {
    dispatch(finishAsync("SEARCH", "SUCCESS"));

    const users = Object.values(getState().users.data);

    dispatch({
      type: "SEARCH_SUCCESS",
      results: users,
      total: Math.ceil(users.length / 10),
    });
  }, 1000);
}

export const handleNewPublication = ({title, image}) => (dispatch, getState) => {
  dispatch(startAsync("M_NEW_PUBLICATION"));
  setTimeout(() => {
    dispatch(finishAsync("M_NEW_PUBLICATION", "SUCCESS"));
    dispatch(notifySuccess("Publicação realizada com sucesso."));

    const data = {
      author: getState().currentUser.id,
      timestamp: Math.floor(Date.now() / 1000),
      title,
      image,
      reactions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ownReaction: undefined,
      id: Date.now() % 9999
    };

    dispatch(insertPublication(data));
  }, 1000);
}

export const authenticate = ({user, password}) => (dispatch, getState) => {
  dispatch(startAsync("AUTH"));
  const credentials = btoa(user + ":" + password);
    
  setTimeout(() => {
    dispatch(finishAsync("AUTH", "SUCCESS"));

    dispatch({
      type: "LOG_IN",
      payload: {
        id: "30",
        credentials
      }
    });
  }, 1000);
}

export const fetchUser = (id) => (dispatch, getState) => {
  if (getState().users.data[id] && getState().users.data[id].id) {
    dispatch(finishAsync("FETCH_USER", "SUCCESS", {id}));
    return;
  }
  
  dispatch(startAsync("FETCH_USER", {id}));
  setTimeout(() => {    
    dispatch({
      type: "INSERT_USER",
      payload: {
        id,
        avatar: "/assets/avatar.jpg",
        name: "Aquele que voltou do além",
        publications: 50,
        following: [30, 70],
        isFollowing: true,
      }
    });
    
    dispatch(finishAsync("FETCH_USER", "SUCCESS", {id}));
  }, 1000);
}