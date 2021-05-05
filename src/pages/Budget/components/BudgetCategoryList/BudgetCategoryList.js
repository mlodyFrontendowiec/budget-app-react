import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleableList } from "components";
import CategoryItem from "./CategoryItem";
import ParentCategory from "./ParentCategory";

const BudgetCategoryList = ({ budgetCategories, allCategories }) => {
  const budgetedCategoriesByParent = groupBy(
    budgetCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );

  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory name={parentName} onClick={() => onClick(parentName)} />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId
        );
        return <CategoryItem key={budgetedCategory.id} name={name} />;
      }),
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
