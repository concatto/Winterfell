import { modifyName, modifyAvatar, removePublication, insertPublication, notifySuccess, notifyError } from './index';
import axios from 'axios';
import { push } from 'react-router-redux';

export const startAsync = (name, payload) => ({
  type: name + "_START", payload
});

export const succeedAsync = (name, payload) => ({
  type: name + "_SUCCESS", payload
});

export const failAsync = (name, payload) => ({
  type: name + "_FAILURE", error: payload
});

const createUrl = (suffix) => {
  if (suffix[0] == "/") suffix = suffix.substring(1); //Remove the initial slash

  return "http://localhost:8084/WinterPics/" + suffix;
};

export const handleReaction = ({id, index, info}) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: createUrl("services/reaction"),
    data: {type: index, publication: id}
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_REACTIONS", (data) => {
    if (index === -1) {
      dispatch(notifySuccess("Reação removida com sucesso!"));
    } else {
      dispatch(notifySuccess("Reação \"" + info.label + "\" registrada com sucesso!"));
    }

    dispatch({type: "REGISTER_REACTION", payload: {id, index}});
  }, () => {
    dispatch(notifyError("Falha ao registrar a reação."));
  });
}

export const handleRename = ({name}) => (dispatch, getState) => {
  const config = {
    method: "put",
    url: createUrl("services/winteruser/changename"),
    data: name,
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_RENAME", () => {
    dispatch(notifySuccess("Seu nome foi alterado com sucesso."));
    dispatch(modifyName(name, getState().currentUser.id));
  }, () => {
    dispatch(notifyError("Falha ao alterar seu nome."));
  });
};

export const handleDeletion = ({id}) => (dispatch, getState) => {
  const config = {
    method: "delete",
    url: createUrl("services/publications"),
    data: {id}
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_DELETION", () => {
    dispatch(notifySuccess("Publicação excluída com sucesso."));
    dispatch(removePublication(id));
  }, () => {
    dispatch(notifyError("Falha ao excluir a publicação."));
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
  }, () => {
    dispatch(notifyError("Falha ao alterar sua imagem."));
  });
}

export const handleSearch = (searchString, offset, limit) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: createUrl("services/search"),
    params: {data: searchString, offset, limit}
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "SEARCH", (data) => {
    const ids = data.result.map((item) => item.id);
    const users = {};
    data.result.forEach((item) => {
      users[item.id] = transformAuthor(item)
    });

    dispatch({type: "INSERT_USER_SET", payload: users});
    dispatch({type: "SEARCH_COMPLETED", results: ids, total: data.nResults});
  });
}

export const handleNewPublication = ({title, image}) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: createUrl("services/publications"),
    data: {publication: {title}, photo: image},
  }

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "M_NEW_PUBLICATION", (data) => {
    console.log(data);
    const pub = transformPublication(data);
    pub.author = pub.author.id; //No need to re-insert the user.

    dispatch(insertPublication(pub));
    dispatch(notifySuccess("Publicação realizada com sucesso."));
  }, () => {
    dispatch(notifyError("Falha ao realizar a publicação."));
  });
}

export const handleToggleFollowing = (id, shouldFollow) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: createUrl("services/following/" + (shouldFollow ? "follow" : "unfollow")),
    data: {id}
  }

  dispatch({type: "TOGGLING_START", payload: id});

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "TOGGLE_FOLLOW", (data) => {
    dispatch({type: "TOGGLING_END", payload: id});
    dispatch({type: "SET_FOLLOWING", id, payload: shouldFollow});
  }, () => {
    dispatch({type: "TOGGLING_END", payload: id});
    dispatch(notifyError("Falha ao modificar seu relacionamento com este usuário."));
  })
};

export const authenticate = (user, password, remember) => (dispatch, getState) => {
  const credentials = btoa(user + ":" + password);
  console.log(credentials);

  const config = {
    method: "get",
    url: createUrl("services/winteruser"),
  };

  makeAuthorizedRequest(dispatch, credentials, config, "AUTH", (data) => {
    dispatch({
      type: "LOG_IN",
      payload: {id: data.id, remember, credentials}
    });

    dispatch(push("/profile"));
  });
}

export const createAccount = (name, user, email, password) => (dispatch) => {
  const config = {
    method: "post",
    url: createUrl("authentication/newuser"),
    data: {
      userdata: {
        name,
        email,
        login: user,
        pass: password
      }
    }
  };

  makeRequest(dispatch, config, "CREATE_ACCOUNT", (data) => {
    
  });
};

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
    ownReaction: data.reactionResume ? data.reactionResume.userReaction : undefined,
    reactions: data.reactionResume ? data.reactionResume.reactions : [0, 0, 0, 0, 0, 0, 0, 0, 0], //Default: no reactions
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
    url: createUrl(isFeed ? "services/feed" : "services/publications/" + id),
    params: {offset, limit},
  };

  makeAuthorizedRequest(dispatch, getCredentials(getState), config, "FETCH_PUBLICATIONS", (data) => {
    console.log(data);
    const authors = extractAuthors(data);
    const publications = data.map((item) => transformPublication(item));

    dispatch({type: "INSERT_USER_SET", payload: authors});
    dispatch({type: "INSERT_PUBLICATION_SET", payload: publications});
  });
}

export const fetchFollowing = (id, limit, offset) => (dispatch, getState) => {
  const offset = getState().following.data.length;
  const config = {
    method: "get",
    url: createUrl("services/following/" + id),
    params: {offset, limit},
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
  config.headers = {"Authorization": "Basic " + credentials};

  makeRequest(dispatch, config, name, onSuccess, onError);
}

const makeRequest = (dispatch, config, name, onSuccess, onError) => {
    dispatch(startAsync(name, config));

    axios(config).then((data) => {
        console.log(data);
        if (onSuccess) onSuccess(data.data);
        dispatch(succeedAsync(name, data));
    }).catch((error) => {
        if (onError) onError(error);
        console.log(error);
        dispatch(failAsync(name, error));
    });
}

const getCredentials = (getState) => {
  return getState().currentUser.credentials;
}
