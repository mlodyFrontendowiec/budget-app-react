import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleableList } from "components";
import ParentCategory from "./ParentCategory";

const BudgetCategoryList = ({ budgetCategories, allCategories }) => {
  console.log(budgetCategories);
  console.log(allCategories);
  const budgetedCategoriesByParent = groupBy(
    budgetCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );
  console.log(allCategories);
  console.log(budgetCategories);
  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory name={parentName} onClick={onClick} />
      ),
      //   children:categories.map(category=>(()))
    })
  );

  return (
    <div>
      <ToggleableList items={listItems} />
    </div>
  );
};

export default connect((state) => ({
  budgetCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
}))(BudgetCategoryList);
