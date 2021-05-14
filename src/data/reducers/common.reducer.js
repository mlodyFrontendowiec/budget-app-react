import {
  LOADING_STATES,
  ALL_CATEGORIES_GET,
  ALL_CATEGORIES_GET_REQUEST,
  ALL_CATEGORIES_GET_SUCCESS,
  ALL_CATEGORIES_GET_FAILURE,
} from "data/constans";

const initialState = {
  loadingState: {},
  allCategories: [],
};

const common = (state = initialState, { type, payload }) => {
  const newLoadingState = { ...state.loadingState };
  switch (type) {
    case ALL_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [type]: LOADING_STATES.LOADING,
        },
      };
    case ALL_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: payload,
        loadingState: newLoadingState,
      };
    case ALL_CATEGORIES_GET_FAILURE:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: [],
        loadingState: newLoadingState,
      };
    default:
      return state;
  }
};
export default common;
