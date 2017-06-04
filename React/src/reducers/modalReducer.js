const modalReducer = (state={}, action) => {
  const regex = /([a-zA-Z]*)_(.*)_MODAL/g;
  const result = regex.exec(action.type);

  if (result != null) {
    switch (result[1]) {
      case "OPEN":
        return {...state, type: result[2], payload: action.payload};
      case "HIDE":
        return {};
    }

  }

  return state;
};

export default modalReducer;
