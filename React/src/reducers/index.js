import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import modalReducer from './modalReducer.js'
import { LOCATION_CHANGE } from 'react-router-redux';

const retrieveUser = () => {
  if (localStorage.getItem("USER_CREDENTIALS")) {
    return JSON.parse(localStorage.getItem("USER_CREDENTIALS"));
  } else if (sessionStorage.getItem("USER_CREDENTIALS")) {
    return JSON.parse(sessionStorage.getItem("USER_CREDENTIALS"));
  }

  return undefined;
}

const currentUser = retrieveUser() || {};

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
  fetching: false,
  fetched: false,
  ended: false,
  data: [],
  secretData: [
    {
      author: 30,
      timestamp: 1492061255,
      title: "Prova de que o React funciona",
      image: "/assets/react.png",
      reactions: [100, 184, 28, 81, 72, 116, 131, 177, 47],
      ownReaction: 8,
      id: 99
    }, {
      author: 50,
      timestamp: 1492060255,
      title: "Prova de que o React funciona",
      image: "/assets/react.png",
      reactions: [119, 52, 185, 67, 112, 189, 36, 166, 32],
      ownReaction: 3,
      id: 233
    }, {
      author: 99,
      timestamp: 1492058255,
      title: "Prova de que o React funciona",
      image: "/assets/react.png",
      reactions: [38, 81, 96, 177, 81, 196, 63, 116, 166],
      ownReaction: null,
      id: 177
    }, {
      author: 30,
      timestamp: 1492061254,
      title: "Prova de que o React funciona e deleta direito",
      image: "/assets/react.png",
      reactions: [188, 24, 111, 20, 29, 143, 92, 56, 154],
      ownReaction: 1,
      id: 123
    }
  ]
};

const tryModifyPublication = (publications, id, callback) => {
  let index = -1;
  for (let i = 0; i < publications.length; i++) {
    if (publications[i].id == id) {
      index = i;
      break;
    }
  }

  if (index >= 0) {
    return callback(publications, index);
  }
  return publications;
}

const initialFollowing = {
  fetching: false,
  fetched: false,
  ended: false,
  data: [],
};

const initialUiState = {
  publicationFilterType: "ALL_PUBLICATIONS"
};

const currentUserReducer = (state=currentUser, action) => {
  let storage = undefined;
  switch (action.type) {
    case "LOG_IN":
      storage = action.payload.remember ? localStorage : sessionStorage;
      storage.setItem("USER_CREDENTIALS", JSON.stringify(action.payload));

      return action.payload;
    case "LOG_OUT":
      //Remove from both, who cares
      sessionStorage.removeItem("USER_CREDENTIALS");
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

const usersReducer = (state={data: {}}, action) => {
  switch (action.type) {
    case "MODIFY_NAME":
      return modifyUser(state, action.id, {name: action.name});
    case "MODIFY_AVATAR":
      return modifyUser(state, action.id, {avatar: action.image});
    case "SET_FOLLOWING":
      return modifyUser(state, action.id, {isFollowing: action.payload})
    case "PREPARE_USER":
      return modifyUser(state, action.id, {fetching: true, fetched: false});
    case "INSERT_USER":
      return modifyUser(state, action.payload.id, {...action.payload, fetching: false, fetched: true});
    case "TOGGLING_START":
    case "TOGGLING_END":
      return modifyUser(state, action.payload, {toggling: action.type == "TOGGLING_START"});
    case "INSERT_USER_SET":
      return {...state, data: {...state.data, ...action.payload}};
    case "FETCH_USER_SUCCESS":
      return {...state, error: undefined};
    case LOCATION_CHANGE:
      const user = retrieveUser();
      if (user) {
        //Keep the user only.
        return {...state, data: {[user.id]: state.data[user.id]}, error: undefined};
      } else {
        return {data: {}};
      }
    case "FETCH_USER_FAILURE":
      return {...state, error: action.error};
  }
  return state;
};

const publicationsReducer = (state=publications, action) => {
  let newData = null;
  switch (action.type) {
    case "FETCH_PUBLICATIONS_START":
      return {...state, fetching: true, fetched: false};
    case "FETCH_PUBLICATIONS_SUCCESS":
    case "FETCH_PUBLICATIONS_FAILURE":
      return {...state, fetching: false, fetched: true, error: action.error};
    case "INSERT_PUBLICATION":
      return {...state, data: [action.data].concat(state.data)};
    case "INSERT_PUBLICATION_SET":
      return {...state, data: state.data.concat(action.payload), ended: action.payload.length == 0};
    case "CHANGE_PUBLICATION_FILTER":
      return {...publications, pathname: state.pathname};
    case LOCATION_CHANGE:
      return publications;
    case "REMOVE_PUBLICATION":
      newData = tryModifyPublication(state.data, action.id, (data, index) => {
        console.log("Splicing at " + index);
        data.splice(index, 1);
        return data;
      });

      return {...state, data: newData};
    case "REGISTER_REACTION":
      newData = tryModifyPublication(state.data, action.payload.id, (data, index) => {
        if (data[index].ownReaction !== undefined) {
          //If the user had reacted to the publication previously, remove it.
          data[index].reactions[data[index].ownReaction]--;
        }

        if (action.payload.index !== -1) {
          //If the user did not remove his reaction, increase the selected reaction amount.
          data[index].reactions[action.payload.index]++;
        }

        data[index].ownReaction = action.payload.index;
        return data;
      });

      return {...state, data: newData};
  }

  return state;
}

const uiReducer = (state=initialUiState, action) => {
  switch (action.type) {
    case "CHANGE_PUBLICATION_FILTER":
      return {...state, publicationFilterType: action.filterType};
    case LOCATION_CHANGE:
      return initialUiState; //Hard reset
    case "AUTH_SUCCESS":
    case "AUTH_FAILURE":
      return {...state, authenticating: false};
    case "AUTH_START":
      return {...state, authenticating: true};
  }

  return state;
}

const searchReducer = (state={}, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {};
    case "SEARCH_START":
      return {working: true};
    case "SEARCH_COMPLETED":
      return {results: action.results, working: false, totalResults: action.total};
    case "SEARCH_FAILURE":
      return {working: false, error: action.error};
  }

  return state;
}

const followingReducer = (state=initialFollowing, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialFollowing;
    case "INSERT_FOLLOWING":
      return {...state, data: state.data.concat(action.payload), ended: action.payload.length == 0};
    case "FETCH_FOLLOWING_FAILURE":
      return {...state, error: action.error};
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
  following: followingReducer,
  notifications,
});

export default reducer;
