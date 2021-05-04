const REACT_APP_API_URL = "http://localhost:3001";

export const fetchAllCategories = () => {
  const promise = fetch(
    `${REACT_APP_API_URL}/categories/?_expand=parentCategory`
  );

  return promise;
};
