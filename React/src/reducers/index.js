import { combineReducers } from 'redux';

const currentUser = '21';
const users = {
  '50': {
    id: 50,
    avatar: "assets/avatar.jpg",
    name: "Vinícius Almeida dos Santos",
    publications: 50,
    following: 90
  },
  '70': {
    id: 70,
    avatar: "assets/avatar.jpg",
    name: "Vinícius Machado",
    publications: 51,
    following: 30
  },
  '990': {
    id: 990,
    avatar: "assets/avatar.jpg",
    name: "Halersson Paris",
    publications: 5,
    following: 999
  },
  '21': {
    id: 21,
    avatar: "assets/avatar.jpg",
    name: "Miguel Copatti",
    publications: 1,
    following: 65535
  }
};

const initialUiState = {
  publicationFilterType: "ALL_PUBLICATIONS"
};

const currentUserReducer = (state=users[currentUser], action) => {
  return state;
};

const usersReducer = (state=users, action) => {
  return state;
};

const uiReducer = (state=initialUiState, action) => {
  switch (action.type) {
    case "CHANGE_PUBLICATION_FILTER":
      return {...state, publicationFilterType: action.filterType};
  }

  return state;
}

const reducer = combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
  ui: uiReducer
});

export default reducer;
