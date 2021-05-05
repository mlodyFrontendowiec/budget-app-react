import React from "react";
import { formatCurrency } from "utils";

import { CategoryAmount, CategoryItem as Root } from "./BudgetCategoryList.css";

const CategoryItem = ({ name, item, transactions }) => {
  console.log(transactions);
  const categoryTransactions = transactions.filter(
    (transaction) => transaction.categoryId === item.id
  );

  const spentOnCategory = categoryTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalLeft = item.budget - spentOnCategory;
  return (
    <Root>
      <span>{name}</span>
      <CategoryAmount negative={totalLeft < 0}>
        {formatCurrency(totalLeft)}
      </CategoryAmount>
    </Root>
  );
};

export default CategoryItem;
