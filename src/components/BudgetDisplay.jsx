import React from "react";
import PropTypes from "prop-types";
import SavingsGoalInput from "./SavingsGoalInput"; // Import the SavingsGoalInput component
import "./BudgetDisplay.css"
const BudgetDisplay = ({ income, expenses, remainingIncome, monthlySavings, savingsGoal, savingsStrategy }) => {
  const { breakdown } = income;

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Additional savings breakdown calculations
  const biWeeklySavings = monthlySavings / 2; // Approximation: 1 month ≈ 2 paychecks
  const dailySavings = monthlySavings / 30; // Approximation: 1 month ≈ 30 days

  return (
    <div className="budget-display">
      <h2>Budget Overview</h2>

      {/* Income Breakdown */}
      <div className="income-section">
        <h3>Income Breakdown</h3>
        {breakdown ? (
          <>
            <p>Annual Income: <span className="money-positive">${breakdown.annual}</span></p>
            <p>Monthly Income: <span className="money-positive">${breakdown.monthly}</span></p>
            <p>Bi-Weekly Income: <span className="money-positive">${breakdown.biweekly}</span></p>
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
          <span className="money-positive">${remainingIncome.toFixed(2)}</span>
        </p>
      </div>

      {/* Monthly Savings */}
      <div className="monthly-savings-section">
        <h3>Savings Breakdown</h3>
        <div className="savingsbreakdown">
  <p>
    Monthly Savings: <span className="savings-amount">${monthlySavings.toFixed(2)}</span>
  </p>
  <p>
    Bi-Weekly Savings (per paycheck): <span className="savings-amount">${biWeeklySavings.toFixed(2)}</span>
  </p>
  <p>
    Daily Savings: <span className="savings-amount">${dailySavings.toFixed(2)}</span>
  </p>
</div>

      </div>

      {/* Optional: Show total expenses 
      <div className="total-expenses-section">
        <h3>Total Expenses</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div> */}

      {/* Savings Goal Component */}
      <SavingsGoalInput
        savingsGoal={savingsGoal}
        savingsStrategy={savingsStrategy}
        remainingIncome={remainingIncome}
        monthlySavings={monthlySavings}
      />
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
  remainingIncome: PropTypes.number.isRequired, // Remaining income passed as a prop
  monthlySavings: PropTypes.number.isRequired, // Monthly savings passed as a prop
  savingsGoal: PropTypes.number.isRequired, // Savings goal passed as a prop
  savingsStrategy: PropTypes.string.isRequired, // Savings strategy passed as a prop
};

export default BudgetDisplay;
