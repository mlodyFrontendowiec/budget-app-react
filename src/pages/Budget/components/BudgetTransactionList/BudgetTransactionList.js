import { selectParentCategory } from "data/actions/budget.actions";
import { groupBy } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { formatCurrency, formatDate } from "utils";

import { List, ListItem } from "./BudgetTransactionList.css";

const BudgetTransactionList = ({
  transactions,
  allCategories,
  selectedParentCategoryId,
}) => {
  const filteredTransactionsBySelectedParentCategory = (() => {
    if (typeof selectedParentCategoryId === "undefined") {
      return transactions;
    }
    return transactions.filter((transaction) => {
      try {
        const category = allCategories.find((category) => {
          return category.id === transaction.categoryId;
        });

        const parentCategoryName = category.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (err) {
        return false;
      }
    });
  })();

  console.log(filteredTransactionsBySelectedParentCategory);

  const groupedTransactions = groupBy(
    filteredTransactionsBySelectedParentCategory,
    (transaction) => new Date(transaction.date).getUTCDate()
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li>
          <ul>
            {transactions.map((transaction) => (
              <ListItem>
                {transaction.description}
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>
                  {
                    (
                      allCategories.find(
                        (category) => category.id === transaction.categoryId
                      ) || {}
                    ).name
                  }
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default connect((state) => ({
  transactions: state.budget.budget.transactions,
  allCategories: state.common.allCategories,
  selectedParentCategoryId: state.budget.selectedParentCategory,
}))(BudgetTransactionList);
