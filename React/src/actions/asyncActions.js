import { modifyName, modifyAvatar, removePublication, insertPublication, notifySuccess } from './index';
import axios from 'axios';

export const startAsync = (name) => ({
  type: name + "_START"
});

export const succeedAsync = (name) => ({
  type: name + "_SUCCESS"
});

export const failAsync = (name) => ({
  type: name + "_FAILURE"
});

const createUrl = (suffix) => {
  return "http://10.26.16.101:8084/WinterPics/" + suffix;
};

export const handleRename = ({name}) => (dispatch, getState) => {
  const config = {
    method: "put",
    url: createUrl("services/winteruser/changename"),
    data: name,
  };
  
  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_RENAME", () => {
    dispatch(notifySuccess("Seu nome foi alterado com sucesso."));
    dispatch(modifyName(name, getState().currentUser.id));
  });
};

export const handleDeletion = ({id}) => (dispatch, getState) => {
  makeAuthorizedRequest(dispatch, getState(), "put", "http://10.26.16.101:8084/WinterPics/services/winteruser/changename", "M_DELETION", () => {
    dispatch(notifySuccess("Publicação excluída com sucesso."));
    dispatch(removePublication(id));
  });
}

export const handleEditAvatar = ({image}) => (dispatch, getState) => {
  const config = {
    method: "put",
    url: createUrl("/services/winteruser/changephoto"),
    data: image
  };
  
  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_EDIT_AVATAR", () => {
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

export const authenticate = (user, password) => (dispatch, getState) => {
  const credentials = btoa(user + ":" + password);
  console.log(credentials);
  
  const config = {
    method: "get",
    url: createUrl("services/winteruser"),
  };
  
  makeAuthorizedRequest(dispatch, credentials, config, "AUTH", (data) => {
    dispatch({
      type: "LOG_IN",
      payload: {
        id: data.id,
        credentials
      }
    });
  });
}

export const fetchUser = (id) => (dispatch, getState) => {
  dispatch({type: "PREPARE_USER", id});

  const config = {
    method: "get",
    url: createUrl("services/winteruser/" + id),
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "FETCH_USER", (data) => {
    const user = {
      id: data.id,
      avatar: createUrl(data.photopath),
      name: data.name,
      publications: data.nPublications,
      following: [],
      isFollowing: data.isFollowing,
    };

    dispatch({
      type: "INSERT_USER",
      payload: user
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
    dispatch(succeedAsync(name));
    onSuccess();
  }, 1000);
}

const makeAuthorizedRequest = (dispatch, credentials, config, name, onSuccess, onError) => {
    dispatch(startAsync(name));
    config.headers = {"Authorization": "Basic " + credentials};
  
    axios(config).then((data) => {
        console.log(data);
        if (onSuccess) onSuccess(data.data);
        dispatch(succeedAsync(name));
    }).catch((error) => {
        if (onError) onError(error);
        console.log(error);
        dispatch(succeedAsync(name));
    });
}

const getCredentials = (getState) => {
  return getState().currentUser.credentials;
}