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
  if (suffix[0] == "/") suffix = suffix.substring(1); //Remove the initial slash

  return "http://localhost:8084/WinterPics/" + suffix;
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
  const config = {
    method: "delete",
    url: createUrl("services/?"),
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_DELETION", () => {
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
  // makeRequest(dispatch, "get", "", "SEARCH", () => {
  //   const users = Object.values(getState().users.data);
  //
  //   dispatch({
  //     type: "SEARCH_SUCCESS",
  //     results: users,
  //     total: Math.ceil(users.length / 10),
  //   });
  // });
}

export const handleNewPublication = ({title, image}) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: createUrl("services/publications"),
    data: {imagepath: "/test.png", title: title},
  }

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_NEW_PUBLICATION", (data) => {
    console.log(data);
    const pub = transformPublication(data);
    pub.author = pub.author.id; //No need to re-insert the user.

    dispatch(insertPublication(pub));
    dispatch(notifySuccess("Publicação realizada com sucesso."));
  });
}

export const handleToggleFollowing = (id) => (dispatch, getState) => {
  dispatch({type: "TOGGLING_START", payload: id});
  setTimeout(() => dispatch({type: "TOGGLING_END", payload: id}), 1000);
};

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

const transformAuthor = (data) => {
  return {
    id: data.id,
    avatar: createUrl(data.photopath),
    name: data.name,
    publications: data.nPublications,
    following: data.nFollowing,
    isFollowing: data.isFollowing,
    fetched: true,
  };
};

const transformPublication = (data) => {
  return {
    author: data.author,
    id: data.id,
    image: createUrl(data.imagepath),
    title: data.title,
    timestamp: Date.parse(data.moment),
    ownReaction: 0,
    reactions: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
}

const extractAuthors = (data) => {
  const authors = {};
  data.forEach((item, index) => {
    authors[item.author.id] = transformAuthor(item.author);
    data[index].author = item.author.id;
  });
  return authors;
}


export const fetchUser = (id) => (dispatch, getState) => {
  dispatch({type: "PREPARE_USER", id});

  const config = {
    method: "get",
    url: createUrl("services/winteruser/" + id),
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "FETCH_USER", (data) => {
    dispatch({
      type: "INSERT_USER",
      payload: transformAuthor(data)
    });
  });
}

export const fetchPublications = (id, isFeed, limit) => (dispatch, getState) => {
  const offset = getState().publications.data.length;
  const config = {
    method: "get",
    url: createUrl(isFeed ? "services/feed" : "services/publications/" + id)
  };

  if (limit) {
    config.url += "/" + offset + "/" + limit;
  }

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "FETCH_PUBLICATIONS", (data) => {
    console.log(data);
    const authors = extractAuthors(data);
    const publications = data.map((item) => transformPublication(item));

    dispatch({type: "INSERT_USER_SET", payload: authors});
    dispatch({type: "INSERT_PUBLICATION_SET", payload: publications});
  });
}

export const fetchFollowing = (id, limit) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: createUrl("services/following")
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "FETCH_FOLLOWING", (data) => {
    const ids = data.map((item) => item.id);
    const users = {};
    data.forEach((item) => {
      users[item.id] = transformAuthor(item)
    });

    dispatch({type: "INSERT_USER_SET", payload: users});
    dispatch({type: "INSERT_FOLLOWING", payload: ids});
  });
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
