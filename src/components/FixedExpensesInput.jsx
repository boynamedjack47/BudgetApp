import React, { useState } from "react";
import PropTypes from "prop-types";

const FixedExpensesInput = ({ expenses, setExpenses }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleAddExpense = () => {
    setExpenses([...expenses, { name: expenseName, amount: parseFloat(expenseAmount) }]);
    setExpenseName("");
    setExpenseAmount("");
  };

  return (
    <div>
      <h2>Enter Fixed Expenses</h2>
      <input
        type="text"
        placeholder="Expense Name"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        min="0"
        step="0.01"
      />
      <button onClick={handleAddExpense}>Add Expense</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

FixedExpensesInput.propTypes = {
  expenses: PropTypes.array.isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default FixedExpensesInput;
