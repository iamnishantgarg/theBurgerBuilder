import * as actionTypes from "../actions/actionsTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        token: action.idToken,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return { ...state };
  }
};

export default reducer;
