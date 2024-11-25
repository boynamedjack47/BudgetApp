import React from "react";
import PropTypes from "prop-types";

const BudgetDisplay = ({ income, expenses, savingsGoal }) => {
  const { breakdown } = income;

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
        <h3>Fixed Expenses</h3>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.name}: ${expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses added.</p>
        )}
      </div>

      {/* Savings Goal */}
      <div className="savings-section">
        <h3>Savings Goal</h3>
        <p>${savingsGoal || "No savings goal set."}</p>
      </div>
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
    })
  ).isRequired,
  savingsGoal: PropTypes.number.isRequired,
};

export default BudgetDisplay;
