import {
  LOADING_STATES,
  BUDGET_GET,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET,
  BUDGETED_CATEGORIES_REQUEST,
  BUDGETED_CATEGORIES_SUCCESS,
  BUDGETED_CATEGORIES_FAILURE,
} from "data/constans";
import API from "data/fetch";

export const fetchBudget = (id) => async (dispatch) => {
  dispatch({ type: BUDGET_GET_REQUEST });
  try {
    const response = await API.budget.fetchBudget(id);
    const data = await response.json();

    dispatch({ type: BUDGET_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BUDGET_GET_FAILURE });
  }
};
export const fetchBudgetedCategories = (id) => async (dispatch) => {
  dispatch({ type: BUDGETED_CATEGORIES_GET });

  try {
    const response = await API.budget.fetchBudgetedCategories(id);
    const data = await response.json();

    dispatch({ type: BUDGETED_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: BUDGETED_CATEGORIES_FAILURE });
  }
};
