import { LOCATION_CHANGE } from 'react-router-redux';

const hide = (state) => ({
  ...state,
  payload: undefined,
  shown: false
});

const modalReducer = (state={shown: false}, action) => {
  const regex = /([a-zA-Z]*)_(.*)_MODAL/g;
  const result = regex.exec(action.type);

  if (result != null) {
    switch (result[1]) {
      case "OPEN":
        return {...state, type: result[2], payload: action.payload, shown: true};
      case "HIDE":
        return hide(state);
      case "CLOSE":
        return {shown: false};
    }
  }

  if (action.type == LOCATION_CHANGE) {
    return {shown: false};
  }
  
  if (action.type.startsWith("M_")) {
    if (action.type.endsWith("_START")) {
      return {...state, busy: true};
    } else if (action.type.endsWith("_SUCCESS")) {
      state = hide(state);

      return {...state, busy: false};
    }
  }

  return state;
};

export default modalReducer;
