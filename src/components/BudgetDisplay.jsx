import React from "react";
import PropTypes from "prop-types";
import SavingsGoal from "./SavingsGoalInput"; // Adjust the path if necessary


const BudgetDisplay = ({ income, expenses }) => {
  const { breakdown } = income;

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Calculate remaining income after expenses
  const remainingIncome = breakdown.monthly - totalExpenses;

  return (
    <div className="budget-display">
      <h2>Budget Overview</h2>

      {/* Income Breakdown */}
      <div className="income-section">
        <h3>Income Breakdown</h3>
        {breakdown ? (
          <>
            <p>Annual Income: ${breakdown.annual}</p>
            <p>Monthly Income: ${breakdown.monthly}</p>
            <p>Bi-Weekly Income: ${breakdown.biweekly}</p>
          </>
        ) : (
          <p>No income data available.</p>
        )}
      </div>

      {/* Fixed Expenses */}
      <div className="expenses-section">
        <h3>Expenses</h3>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.name}: ${expense.amount.toFixed(2)} ({expense.frequency})
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses added.</p>
        )}
      </div>

      {/* Remaining Income After Expenses */}
      <div className="remaining-income-section">
        <h3>Income After Expenses</h3>
        <p className={remainingIncome >= 0 ? "positive-money" : "negative-money"}>
          ${remainingIncome.toFixed(2)}
        </p>
      </div>

      <SavingsGoal remainingIncome={remainingIncome} />
    </div>
  );
};

BudgetDisplay.propTypes = {
  income: PropTypes.shape({
    type: PropTypes.string,
    amount: PropTypes.number,
    breakdown: PropTypes.shape({
      annual: PropTypes.string,
      monthly: PropTypes.string,
      biweekly: PropTypes.string,
    }),
  }).isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      frequency: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BudgetDisplay;
