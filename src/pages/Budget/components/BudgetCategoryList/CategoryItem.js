import React from "react";

import { CategoryItem as Root } from "./BudgetCategoryList.css";

const ParentCategory = ({ name }) => {
  return <Root>{name}</Root>;
};

export default ParentCategory;
