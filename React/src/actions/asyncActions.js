import { modifyName, modifyAvatar, removePublication, insertPublication, notifySuccess } from './index';

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

    const users = Object.values(getState().users);

    dispatch({
      type: "SEARCH_SUCCESS",
      results: users,
      total: Math.ceil(users.length / 10),
    });
  }, 1000);
}

export const handleNewPublication = ({title, image}) => (dispatch, getState) => {
  dispatch(startAsync());
  setTimeout(() => {
    dispatch(finishAsync("SUCCESS"));
    dispatch(notifySuccess("Publicação realizada com sucesso."));

    const data = {
      author: getState().currentUser,
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
