const REACT_APP_API_URL = "http://localhost:3001";

export const fetchBudget = (id) => {
  const promise = fetch(
    `${REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`
  );

  return promise;
};

export const fetchBudgetedCategories = (id) => {
  const promise = fetch(`${REACT_APP_API_URL}/budgets/${id}/budgetCategories`);

  return promise;
};
