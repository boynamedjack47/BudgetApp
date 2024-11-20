import React from "react";
import PropTypes from "prop-types";

const BudgetDisplay = ({ income, expenses, savingsGoal }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const disposableIncome = income.amount - totalExpenses - savingsGoal;

  return (
    <div>
      <h2>Budget Overview</h2>
      <p>Total Income: ${income.amount.toFixed(2)}</p>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Savings Goal: ${savingsGoal.toFixed(2)}</p>
      <p>Disposable Income: ${disposableIncome.toFixed(2)}</p>
    </div>
  );
};

BudgetDisplay.propTypes = {
  income: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired,
  savingsGoal: PropTypes.number.isRequired,
};

export default BudgetDisplay;
