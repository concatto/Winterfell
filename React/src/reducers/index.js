import { combineReducers } from 'redux';
import modalReducer from './modalReducer.js'

const currentUser = '30';
const users = {
  '50': {
    id: 50,
    avatar: "assets/avatar.jpg",
    name: "Vinícius Almeida dos Santos",
    publications: 50,
    following: [30, 70],
    isFollowing: true,
  },
  '70': {
    id: 70,
    avatar: "assets/avatar.jpg",
    name: "Vinícius Machado",
    publications: 51,
    following: [99, 30],
    isFollowing: false,
  },
  '99': {
    id: 99,
    avatar: "assets/avatar.jpg",
    name: "Halersson Paris",
    publications: 5,
    following: [30, 70, 50],
    isFollowing: true,
  },
  '30': {
    id: 30,
    avatar: "assets/avatar.jpg",
    name: "Miguel Copatti",
    publications: 1,
    following: [99, 50],
    isFollowing: true,
  }
};

const publications = {
  99: {
    author: 30,
    timestamp: 1492061255,
    title: "Prova de que o React funciona",
    image: "assets/react.png",
    reactions: [100, 184, 28, 81, 72, 116, 131, 177, 47],
    ownReaction: 8,
    id: 99
  },
  233: {
    author: 50,
    timestamp: 1492060255,
    title: "Prova de que o React funciona",
    image: "assets/react.png",
    reactions: [119, 52, 185, 67, 112, 189, 36, 166, 32],
    ownReaction: 3,
    id: 233
  },
  177: {
    author: 99,
    timestamp: 1492058255,
    title: "Prova de que o React funciona",
    image: "assets/react.png",
    reactions: [38, 81, 96, 177, 81, 196, 63, 116, 166],
    ownReaction: null,
    id: 177
  },
  123: {
    author: 30,
    timestamp: 1492061254,
    title: "Prova de que o React funciona e deleta direito",
    image: "assets/react.png",
    reactions: [188, 24, 111, 20, 29, 143, 92, 56, 154],
    ownReaction: 1,
    id: 123
  }
};

const initialUiState = {
  publicationFilterType: "ALL_PUBLICATIONS"
};

const currentUserReducer = (state=currentUser, action) => {
  return state;
};

const usersReducer = (state=users, action) => {
  return state;
};

const publicationsReducer = (state=publications, action) => {
  return state;
}

const uiReducer = (state=initialUiState, action) => {
  switch (action.type) {
    case "CHANGE_PUBLICATION_FILTER":
      return {...state, publicationFilterType: action.filterType};
  }

  return state;
}

const reducer = combineReducers({
  publications: publicationsReducer,
  currentUser: currentUserReducer,
  modal: modalReducer,
  users: usersReducer,
  ui: uiReducer,
});

export default reducer;
