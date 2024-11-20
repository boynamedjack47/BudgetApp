import React, { useState } from "react";
import PropTypes from "prop-types";

const SavingsGoalInput = ({ setSavingsGoal }) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavingsGoal(parseFloat(goal));
    setGoal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Your Savings Goal</h2>
      <label>
        Goal Amount:
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </label>
      <button type="submit">Save Goal</button>
    </form>
  );
};

SavingsGoalInput.propTypes = {
  setSavingsGoal: PropTypes.func.isRequired,
};

export default SavingsGoalInput;
