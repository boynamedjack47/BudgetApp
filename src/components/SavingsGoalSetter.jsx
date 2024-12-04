import React, { useState } from "react";
//import "./SavingsGoalSetter.css"; // Optional: Add styling here.

const SavingsGoalSetter = ({ savingsGoal, setSavingsGoal }) => {
  const [inputValue, setInputValue] = useState(savingsGoal || 0);

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setInputValue(value);
  };

  const handleSaveGoal = () => {
    setSavingsGoal(inputValue);
  };

  return (
    <div className="savings-goal-setter">
      <h3>Set Your Savings Goal</h3>
      <div className="savings-goal-input-container">
        <label htmlFor="savingsGoal">Savings Goal:</label>
        <input
          type="number"
          id="savingsGoal"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter savings goal"
        />
        <button onClick={handleSaveGoal}>Save Goal</button>
      </div>
      {savingsGoal > 0 && (
        <p className="savings-goal-display">
          Current Savings Goal: <strong>${savingsGoal.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
};

export default SavingsGoalSetter;
