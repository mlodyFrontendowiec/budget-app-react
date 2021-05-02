import {
  LOADING_STATES,
  BUDGET_GET,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
} from "data/constans";

const initialState = {
  loadingState: {},
  budget: {},
  budgetCategories: [],
};

const budget = (state = initialState, { type, payload }) => {
  const newLoadingState = { ...state.loadingState };
  switch (type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [type]: LOADING_STATES.LOADING,
        },
      };
    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: payload,
        loadingState: newLoadingState,
      };
    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: newLoadingState,
      };
    default:
      return state;
  }
};
export default budget;
