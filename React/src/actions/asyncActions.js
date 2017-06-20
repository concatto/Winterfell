import { modifyName, modifyAvatar, removePublication, insertPublication, notifySuccess } from './index';

export const startAsync = (name) => ({
  type: name + "_START"
});

export const finishAsync = (name) => ({
  type: name + "_FINISH"
});

export const handleRename = ({name}) => (dispatch, getState) => {
  makeRequest(dispatch, "post", "", "M_RENAME", () => {
    dispatch(notifySuccess("Seu nome foi alterado com sucesso."));
    dispatch(modifyName(name, getState().currentUser.id));
  });
};

export const handleDeletion = ({id}) => (dispatch) => {
  makeRequest(dispatch, "post", "", "M_DELETION", () => {
    dispatch(notifySuccess("Publicação excluída com sucesso."));
    dispatch(removePublication(id));
  });
}

export const handleEditAvatar = ({image}) => (dispatch, getState) => {
  makeRequest(dispatch, "post", "", "M_EDIT_AVATAR", () => {
    dispatch(notifySuccess("Sua imagem foi alterada com sucesso."));
    dispatch(modifyAvatar(image, getState().currentUser.id));
  });
}

export const handleSearch = (searchString) => (dispatch, getState) => {
  makeRequest(dispatch, "get", "", "SEARCH", () => {
    const users = Object.values(getState().users.data);

    dispatch({
      type: "SEARCH_SUCCESS",
      results: users,
      total: Math.ceil(users.length / 10),
    });
  });
}

export const handleNewPublication = ({title, image}) => (dispatch, getState) => {
  makeRequest(dispatch, "post", "", "M_NEW_PUBLICATION", () => {
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
    dispatch(notifySuccess("Publicação realizada com sucesso."));
  });
}

export const authenticate = ({user, password}) => (dispatch) => {
  makeRequest(dispatch, "post", "", "AUTH", () => {
    const credentials = btoa(user + ":" + password);

    dispatch({
      type: "LOG_IN",
      payload: {
        id: "30",
        credentials
      }
    });
  });
}

export const fetchUser = (id) => (dispatch, getState) => {
  dispatch({type: "PREPARE_USER", id});

  makeRequest(dispatch, "get", "", "FETCH_USER", () => {
    const data = {
      id,
      avatar: "/assets/avatar.jpg",
      name: "Aquele que voltou do além",
      publications: 50,
      following: [30, 70],
      isFollowing: true,
    };

    dispatch({
      type: "INSERT_USER",
      payload: data
    });
  });
}

export const fetchPublications = (id) => (dispatch, getState) => {
  makeRequest(dispatch, "get", "", "FETCH_PUBLICATIONS", (response) => {
    dispatch({
      type: "INSERT_PUBLICATION_SET",
      payload: getState().publications.secretData
    });
  });
}

export const fetchFeed = () => (dispatch) => {
  makeRequest(dispatch, "get", "", "FETCH_PUBLICATIONS", (response) => {
    //Despachar algo como SET_PUBLICATIONS. Tratamento: inserir usuários que vieram!
  });
}

const makeRequest = (dispatch, method, url, name, onSuccess) => {
  dispatch(startAsync(name));
  setTimeout(() => {
    dispatch(finishAsync(name));
    onSuccess();
  }, 1000);
}
