import React, { useRef, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleableList } from "components";
import CategoryItem from "./CategoryItem";
import ParentCategory from "./ParentCategory";
import { useTranslation } from "react-i18next";
import "styled-components/macro";
import { selectParentCategory } from "data/actions/budget.actions";
const BudgetCategoryList = ({
  budgetCategories,
  allCategories,
  budget,
  selectParentCategory,
}) => {
  const { t } = useTranslation();

  const handleClickParentCategoryRef = useRef(null);

  const budgetedCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetCategories,
        (item) =>
          allCategories.find((category) => category.id === item.categoryId)
            .parentCategory.name
      ),
    [budgetCategories, allCategories]
  );

  const handleClearParentCategorySelect = useCallback(() => {
    selectParentCategory();
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  const handeleSelectRestParentCategories = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  const listItems = useMemo(
    () =>
      Object.entries(budgetedCategoriesByParent).map(
        ([parentName, categories]) => ({
          id: parentName,
          Trigger: ({ onClick }) => (
            <ParentCategory
              name={parentName}
              onClick={() => {
                onClick(parentName);
                selectParentCategory(parentName);
              }}
              categories={categories}
              transactions={budget.transactions}
            />
          ),
          children: categories.map((budgetedCategory) => {
            const { name } = allCategories.find(
              (category) => category.id === budgetedCategory.categoryId
            );
            return (
              <CategoryItem
                key={budgetedCategory.id}
                name={name}
                item={budgetedCategory}
                transactions={budget.transactions}
              />
            );
          }),
        })
      ),
    [
      allCategories,
      budget.transactions,
      budgetedCategoriesByParent,
      selectParentCategory,
    ]
  );

  const totalSpent = useMemo(
    () =>
      budget.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
    [budget.transactions]
  );

  const restToSpent = useMemo(
    () => budget.totalAmount - totalSpent,
    [budget.totalAmount, totalSpent]
  );
  const amountTaken = useMemo(
    () =>
      budgetCategories.reduce((acc, budgetCategory) => {
        const categoryTransactions = budget.transactions.filter(
          (transaction) => transaction.categoryId === budgetCategory.id
        );
        const categoryExpenses = categoryTransactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        const totalAmount =
          categoryExpenses < budgetCategory.budget
            ? budgetCategory.budget
            : categoryExpenses;

        return acc + Math.max(categoryExpenses, budgetCategory.budget);
      }, 0),
    [budget.transactions, budgetCategories]
  );

  const notBudgetedTransaction =
    (() =>
      budget.transactions.filter(
        (transaction) =>
          !budgetCategories.find(
            (budgetCategory) => budgetCategory.id === transaction.categoryId
          )
      ),
    [budget.transactions, budgetCategories]);

  const notBudgeteExpense = useMemo(
    () =>
      notBudgetedTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
    [notBudgetedTransaction]
  );

  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgeteExpense,
    [budget.totalAmount, amountTaken, notBudgeteExpense]
  );

  return (
    <div>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}
        />
      </div>
      <ToggleableList
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={t("Other categories")}
          amount={availableForRestCategories}
          onClick={handeleSelectRestParentCategories}
        />
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    budgetCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
  }),
  { selectParentCategory }
)(BudgetCategoryList);
