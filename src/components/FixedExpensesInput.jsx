import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCar, faUtensils, faFilm, faHeart, faPiggyBank, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import './FixedExpensesInput.css';

const FixedExpensesInput = ({ expenses, setExpenses }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Housing");
  const [expenseDueDay, setExpenseDueDay] = useState(""); // New state for due day
  const [editingId, setEditingId] = useState(null); // Track currently editing expense
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Track which settings menu is open

  // Function to calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Function to get the correct ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return `${day}st`;
    } else if (day === 2 || day === 22) {
      return `${day}nd`;
    } else if (day === 3 || day === 23) {
      return `${day}rd`;
    } else {
      return `${day}th`;
    }
  };

  const handleAddOrEditExpense = () => {
    if (expenseName && expenseAmount && expenseDueDay) {
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
                  dueDay: parseInt(expenseDueDay), // Update due day
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
          dueDay: parseInt(expenseDueDay), // Add due day
        };
        setExpenses([...expenses, newExpense]);
      }
      // Reset form fields
      setExpenseName("");
      setExpenseAmount("");
      setExpenseCategory("Housing");
      setExpenseDueDay(""); // Reset due day field
    }
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setExpenseName(expenseToEdit.name);
      setExpenseAmount(expenseToEdit.amount);
      setExpenseCategory(expenseToEdit.category);
      setExpenseDueDay(expenseToEdit.dueDay); // Populate due day
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
        <div className="input-group">
          <label htmlFor="expense-due-day">Due Date:</label>
          <input
            type="number"
            id="expense-due-day"
            value={expenseDueDay}
            onChange={(e) => setExpenseDueDay(e.target.value)}
            placeholder="e.g., 1 (for the 1st of the month)"
            min="1"
            max="31"
          />
        </div>
        <button className="expense-button" onClick={handleAddOrEditExpense}>
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
              <strong>{expense.name}</strong> - <span className="money-negative">${expense.amount.toFixed(2)} </span>
              {expense.dueDay && (
                <span> (Due: The {getOrdinalSuffix(expense.dueDay)})</span>
              )}
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
        <h4>Total Expenses: <span className="money-positive">${calculateTotal().toFixed(2)}</span></h4>
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
      dueDay: PropTypes.number.isRequired, // Include due day in prop types
    })
  ).isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default FixedExpensesInput;
