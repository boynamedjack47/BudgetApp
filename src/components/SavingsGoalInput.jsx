import React, { useState } from "react";
import PropTypes from "prop-types";


const SavingsGoal = ({ remainingIncome }) => {
  const [savingsGoal, setSavingsGoal] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    if (savingsGoal !== "" && parseFloat(savingsGoal) > 0) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setSavingsGoal("");
    setIsEditing(true);
  };

  // Calculate months to reach the savings goal
  const monthsToGoal =
    remainingIncome > 0 && savingsGoal
      ? (parseFloat(savingsGoal) / remainingIncome).toFixed(1)
      : 0;

  return (
    <div className="savings-goal">
      <h2>Savings Goal</h2>

      {isEditing ? (
        <div>
          <input
            type="number"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
            placeholder="Enter your savings goal"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Current Savings Goal: ${parseFloat(savingsGoal).toFixed(2)}</p>
          <p>
            Months to Reach Goal:{" "}
            {monthsToGoal > 0 ? monthsToGoal : "N/A"}
          </p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

SavingsGoal.propTypes = {
  remainingIncome: PropTypes.number.isRequired, // Monthly income remaining after expenses
};

export default SavingsGoal;
