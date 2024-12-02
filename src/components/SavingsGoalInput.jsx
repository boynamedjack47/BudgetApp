import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SavingsGoal = ({ remainingIncome }) => {
  // Load the saved values from local storage on component mount
  const [savingsGoal, setSavingsGoal] = useState(localStorage.getItem("savingsGoal") || "");
  const [savingsStrategy, setSavingsStrategy] = useState(localStorage.getItem("savingsStrategy") || "Aggressive");
  const [isEditing, setIsEditing] = useState(!savingsGoal);
  const [monthsToGoal, setMonthsToGoal] = useState(null);

  // Save to local storage whenever savingsGoal or savingsStrategy changes
  useEffect(() => {
    if (savingsGoal && savingsStrategy) {
      localStorage.setItem("savingsGoal", savingsGoal);
      localStorage.setItem("savingsStrategy", savingsStrategy);
    }
  }, [savingsGoal, savingsStrategy]);

  // Calculate how long it would take to reach the savings goal
  useEffect(() => {
    if (remainingIncome > 0 && savingsGoal > 0) {
      const percentage =
        savingsStrategy === "Aggressive"
          ? 1 // 100% of remaining income
          : savingsStrategy === "Moderate"
          ? 0.5 // 50% of remaining income
          : 0.25; // 25% of remaining income

      const monthlySavings = remainingIncome * percentage;
      const months = monthlySavings > 0 ? (savingsGoal / monthlySavings).toFixed(1) : null;
      setMonthsToGoal(months);
    }
  }, [remainingIncome, savingsGoal, savingsStrategy]);

  // Calculate the monthly amount to set aside based on strategy
  const monthlyAmount = remainingIncome * (savingsStrategy === "Aggressive" ? 1 : savingsStrategy === "Moderate" ? 0.5 : 0.25);

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
    setSavingsStrategy("Aggressive"); // Reset strategy to default
    setMonthsToGoal(null); // Reset the months to goal
    setIsEditing(true);
    localStorage.removeItem("savingsGoal");
    localStorage.removeItem("savingsStrategy");
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
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="Enter your savings goal"
            />
          </label>

          <label>
            Savings Strategy:{" "}
            <select
              value={savingsStrategy}
              onChange={(e) => setSavingsStrategy(e.target.value)}
            >
              <option value="Aggressive">Aggressive (100%)</option>
              <option value="Moderate">Moderate (50%)</option>
              <option value="Passive">Passive (25%)</option>
              <option value="Custom">Custom </option>
            </select>
          </label>

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Current Savings Goal: ${parseFloat(savingsGoal).toFixed(2)}</p>
          <p>
            Strategy: {savingsStrategy} : ${monthlyAmount.toFixed(2)} per month
          </p>
          <p>
            Months to Reach Goal:{" "}
            {monthsToGoal ? `${monthsToGoal} months` : "N/A"}
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

