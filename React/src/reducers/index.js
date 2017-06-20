import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import modalReducer from './modalReducer.js'
import { LOCATION_CHANGE } from 'react-router-redux';

const currentUser = JSON.parse(localStorage.getItem("USER_CREDENTIALS"));

const users = {
  fetching: false,
  fetched: false,
  data: {
    '50': {
      id: 50,
      avatar: "/assets/avatar.jpg",
      name: "Vinícius Almeida dos Santos",
      publications: 50,
      following: [30, 70],
      isFollowing: true,
      fetched: true,
    },
    '70': {
      id: 70,
      avatar: "/assets/avatar.jpg",
      name: "Vinícius Machado",
      publications: 51,
      following: [99, 30],
      isFollowing: false,
      fetched: true,
    },
    '99': {
      id: 99,
      avatar: "/assets/avatar.jpg",
      name: "Halersson Paris",
      publications: 5,
      following: [30, 70, 50],
      isFollowing: true,
      fetched: true,
    },
    '30': {
      id: 30,
      avatar: "/assets/avatar.jpg",
      name: "Miguel Copatti",
      publications: 1,
      following: [99, 50],
      isFollowing: true,
      fetched: true,
    }
  }
};

const publications = {
  99: {
    author: 30,
    timestamp: 1492061255,
    title: "Prova de que o React funciona",
    image: "/assets/react.png",
    reactions: [100, 184, 28, 81, 72, 116, 131, 177, 47],
    ownReaction: 8,
    id: 99
  },
  233: {
    author: 50,
    timestamp: 1492060255,
    title: "Prova de que o React funciona",
    image: "/assets/react.png",
    reactions: [119, 52, 185, 67, 112, 189, 36, 166, 32],
    ownReaction: 3,
    id: 233
  },
  177: {
    author: 99,
    timestamp: 1492058255,
    title: "Prova de que o React funciona",
    image: "/assets/react.png",
    reactions: [38, 81, 96, 177, 81, 196, 63, 116, 166],
    ownReaction: null,
    id: 177
  },
  123: {
    author: 30,
    timestamp: 1492061254,
    title: "Prova de que o React funciona e deleta direito",
    image: "/assets/react.png",
    reactions: [188, 24, 111, 20, 29, 143, 92, 56, 154],
    ownReaction: 1,
    id: 123
  }
};

const initialUiState = {
  publicationFilterType: "ALL_PUBLICATIONS"
};

const currentUserReducer = (state=currentUser, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("USER_CREDENTIALS", JSON.stringify(action.payload));
      return action.payload;
    case "LOG_OUT":
      localStorage.removeItem("USER_CREDENTIALS");
      return {};
  }
  
  return state;
};

const modifyUser = (state, id, properties) => {
  const data = {...state.data};
  data[id] = {...data[id], ...properties};
  
  return {...state, data};
};

const usersReducer = (state=users, action) => {
  switch (action.type) {
    case "MODIFY_NAME":
      return modifyUser(state, action.id, {name: action.name});
    case "MODIFY_AVATAR":
      return modifyUser(state, action.id, {avatar: action.image});
    case "TOGGLE_FOLLOWING":
      return modifyUser(state, action.id, {isFollowing: !state[action.id].isFollowing})
    case "FETCH_USER_START":
      return modifyUser(state, action.payload.id, {fetching: true, fetched: false});
    case "FETCH_USER_FINISH":
      return modifyUser(state, action.payload.id, {fetching: false, fetched: true});
    case "INSERT_USER":
      return modifyUser(state, action.payload.id, action.payload);
  }
  return state;
};

const publicationsReducer = (state=publications, action) => {
  switch (action.type) {
    case "INSERT_PUBLICATION":
      return {...state, [action.data.id]: action.data};
    case "REMOVE_PUBLICATION":
      state = {...state};
      delete state[action.id];
      return state;
  }
  return state;
}

const uiReducer = (state=initialUiState, action) => {
  switch (action.type) {
    case "CHANGE_PUBLICATION_FILTER":
      return {...state, publicationFilterType: action.filterType};
  }

  return state;
}

const searchReducer = (state={}, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {};
    case "SEARCH_START":
      return {working: true};
    case "SEARCH_SUCCESS":
      return {results: action.results, working: false, totalResults: action.total};
  }

  return state;
}

const reducer = combineReducers({
  publications: publicationsReducer,
  currentUser: currentUserReducer,
  modal: modalReducer,
  users: usersReducer,
  ui: uiReducer,
  router: routerReducer,
  search: searchReducer,
  notifications,
});

export default reducer;