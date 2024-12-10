import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import './SavingsGoal.css';

const SavingsGoalInput = ({ savingsStrategy, remainingIncome, monthlySavings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(localStorage.getItem("savingsGoal") || ""); // Retrieve from localStorage
  const [monthsToGoal, setMonthsToGoal] = useState(null);

  // Calculate how long it would take to reach the savings goal
  useEffect(() => {
    if (remainingIncome > 0 && goal > 0 && monthlySavings > 0) {
      const months = (goal / monthlySavings).toFixed(1);
      setMonthsToGoal(months);
    }
  }, [remainingIncome, goal, monthlySavings]);

  // Save to localStorage whenever the goal changes
  useEffect(() => {
    if (goal) {
      localStorage.setItem("savingsGoal", goal); // Save goal to localStorage
    }
  }, [goal]);

  const handleSave = () => {
    if (goal !== "" && parseFloat(goal) > 0) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setGoal("");  // Clear the goal
    setMonthsToGoal(null);
    setIsEditing(true);
    localStorage.removeItem("savingsGoal"); // Remove goal from localStorage
  };

  return (
    <div className="savings-goal">
      <h2>Savings Goal</h2>

      {isEditing ? (
        <div>
          <label>
            Set Savings Goal: $
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter your savings goal"
            />
          </label>

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Current Savings Goal: ${parseFloat(goal).toFixed(2)}</p>
      
          <p>
            Months to Reach Goal: {monthsToGoal ? `${monthsToGoal} months` : "N/A"}
          </p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

SavingsGoalInput.propTypes = {
  savingsStrategy: PropTypes.string.isRequired,
  remainingIncome: PropTypes.number.isRequired,
  monthlySavings: PropTypes.number.isRequired,
};

export default SavingsGoalInput;
