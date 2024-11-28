import React, { useState } from "react";
import PropTypes from "prop-types";

const FixedExpensesInput = ({ expenses, setExpenses }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseFrequency, setExpenseFrequency] = useState("monthly");
  const [isEditing, setIsEditing] = useState(null); // Tracks the index being edited

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount > 0) {
      setExpenses([
        ...expenses,
        {
          name: expenseName,
          amount: parseFloat(expenseAmount),
          frequency: expenseFrequency,
        },
      ]);
      setExpenseName("");
      setExpenseAmount(0);
      setExpenseFrequency("monthly");
    }
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
    setExpenseName(expenseToEdit.name);
    setExpenseAmount(expenseToEdit.amount);
    setExpenseFrequency(expenseToEdit.frequency);
    setIsEditing(index);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedExpenses = expenses.map((expense, index) =>
      index === isEditing
        ? {
            name: expenseName,
            amount: parseFloat(expenseAmount),
            frequency: expenseFrequency,
          }
        : expense
    );
    setExpenses(updatedExpenses);
    setExpenseName("");
    setExpenseAmount(0);
    setExpenseFrequency("monthly");
    setIsEditing(null);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="fixed-expenses-input">
      <h2>Fixed Expenses</h2>
      <form  className="form1" onSubmit={isEditing !== null ? handleSaveEdit : handleAddExpense}>
        <label>
          Expense Name:
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </label>
        <label>
          Frequency:
          <select
            value={expenseFrequency}
            onChange={(e) => setExpenseFrequency(e.target.value)}
            required
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="annually">Annually</option>
          </select>
        </label>
        <button type="submit">{isEditing !== null ? "Save Changes" : "Add Expense"}</button>
        {isEditing !== null && (
          <button
            type="button"
            onClick={() => {
              setExpenseName("");
              setExpenseAmount(0);
              setExpenseFrequency("monthly");
              setIsEditing(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ${expense.amount.toFixed(2)} ({expense.frequency})
            <button onClick={() => handleEditExpense(index)}>Edit</button>
            <button onClick={() => handleDeleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Total Expenses Display */}
      <p>
        <strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}
      </p>
    </div>
  );
};

FixedExpensesInput.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      frequency: PropTypes.string.isRequired,
    })
  ).isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default FixedExpensesInput;
