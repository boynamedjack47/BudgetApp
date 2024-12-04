import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCar, faUtensils, faFilm, faHeart, faPiggyBank, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import './FixedExpensesInput.css';

const FixedExpensesInput = ({ expenses, setExpenses }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Housing");
  const [editingId, setEditingId] = useState(null); // Track currently editing expense
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Track which settings menu is open

  // Function to calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const handleAddOrEditExpense = () => {
    if (expenseName && expenseAmount) {
      if (editingId) {
        // Update existing expense
        setExpenses(
          expenses.map((expense) =>
            expense.id === editingId
              ? {
                  ...expense,
                  name: expenseName,
                  amount: parseFloat(expenseAmount),
                  category: expenseCategory,
                }
              : expense
          )
        );
        setEditingId(null); // Reset editing state
      } else {
        // Add new expense
        const newExpense = {
          id: Date.now(),
          name: expenseName,
          amount: parseFloat(expenseAmount),
          category: expenseCategory,
        };
        setExpenses([...expenses, newExpense]);
      }
      // Reset form fields
      setExpenseName("");
      setExpenseAmount("");
      setExpenseCategory("Housing");
    }
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setExpenseName(expenseToEdit.name);
      setExpenseAmount(expenseToEdit.amount);
      setExpenseCategory(expenseToEdit.category);
      setEditingId(id);
    }
    setVisibleMenuId(null); // Close the settings menu
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setVisibleMenuId(null); // Close the settings menu
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Housing":
        return faHouse;
      case "Transportation":
        return faCar;
      case "Food":
        return faUtensils;
      case "Entertainment":
        return faFilm;
      case "Health":
        return faHeart;
      case "Savings/Investments":
        return faPiggyBank;
      default:
        return faEllipsisVertical;
    }
  };

  return (
    <div className="fixed-expenses-input">
      <h2>Monthly Expenses</h2>
      <div className="expenseinput">
      <div className="input-group">
        <label htmlFor="expense-name">Expense Name:</label>
        <input
          type="text"
          id="expense-name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="e.g., Rent"
        />
      </div>
      <div className="input-group">
        <label htmlFor="expense-amount">Amount ($):</label>
        <input
          type="number"
          id="expense-amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="e.g., 1200"
        />
      </div>
      <div className="input-group">
        <label htmlFor="expense-category">Category:</label>
        <select
          id="expense-category"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="Housing">Housing</option>
          <option value="Transportation">Transportation</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Savings/Investments">Savings/Investments</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button onClick={handleAddOrEditExpense}>
        {editingId ? "Save Changes" : "Add Expense"}
      </button>
      </div>

      <div className="expense-list">
        <h3>Current Expenses</h3>
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-main">
              <FontAwesomeIcon
                icon={getCategoryIcon(expense.category)}
                style={{ marginRight: "10px" }}
              />
              <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)}
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="settings-icon"
                onClick={() =>
                  setVisibleMenuId(visibleMenuId === expense.id ? null : expense.id)
                }
              />
            </div>
            {visibleMenuId === expense.id && (
              <div className="expense-settings">
                <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
                <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Display the total cost of all expenses */}
      <div className="total-expenses">
        <h4>Total Expenses: ${calculateTotal().toFixed(2)}</h4>
      </div>
    </div>
  );
};

FixedExpensesInput.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default FixedExpensesInput;
