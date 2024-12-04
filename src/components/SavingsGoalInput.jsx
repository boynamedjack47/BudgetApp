import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SavingsGoalInput = ({ savingsGoal, savingsStrategy, remainingIncome, monthlySavings }) => {
  const [isEditing, setIsEditing] = useState(!savingsGoal);
  const [goal, setGoal] = useState(savingsGoal);
  const [monthsToGoal, setMonthsToGoal] = useState(null);

  // Calculate how long it would take to reach the savings goal
  useEffect(() => {
    if (remainingIncome > 0 && goal > 0 && monthlySavings > 0) {
      const months = (goal / monthlySavings).toFixed(1);
      setMonthsToGoal(months);
    }
  }, [remainingIncome, goal, monthlySavings]);

  const handleSave = () => {
    if (goal !== "" && parseFloat(goal) > 0) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setGoal("");
    setMonthsToGoal(null);
    setIsEditing(true);
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
            Strategy: {savingsStrategy} : ${monthlySavings ? monthlySavings.toFixed(2) : "0.00"} per month
          </p>
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
  savingsGoal: PropTypes.number.isRequired,
  savingsStrategy: PropTypes.string.isRequired,
  remainingIncome: PropTypes.number.isRequired,
  monthlySavings: PropTypes.number.isRequired,
};

export default SavingsGoalInput;