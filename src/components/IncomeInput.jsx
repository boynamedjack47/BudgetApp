import React, { useState } from "react";
import PropTypes from "prop-types";

const IncomeInput = ({ setIncome }) => {
  const [type, setType] = useState("hourly");
  const [amount, setAmount] = useState(0); // Hourly rate or annual salary
  const [hours, setHours] = useState(40); // Default to 40 hours/week for hourly

  const handleSubmit = (e) => {
    e.preventDefault();

    let calculatedAmount;

    if (type === "hourly") {
      const regularHours = Math.min(hours, 40); // Maximum regular hours is 40
      const overtimeHours = Math.max(hours - 40, 0); // Hours above 40 are overtime
      calculatedAmount =
        regularHours * amount + overtimeHours * amount * 1.5;
    } else {
      calculatedAmount = amount; // Salary remains unchanged
    }

    setIncome({ type, amount: parseFloat(calculatedAmount) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Your Income</h2>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="hourly">Hourly</option>
          <option value="salary">Salary</option>
        </select>
      </label>
      <label>
        {type === "hourly" ? "Hourly Rate:" : "Annual Salary:"}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </label>
      {type === "hourly" && (
        <label>
          Average Weekly Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="0"
            step="1"
            required
          />
        </label>
      )}
      <button type="submit">Save Income</button>
    </form>
  );
};

IncomeInput.propTypes = {
  setIncome: PropTypes.func.isRequired,
};

export default IncomeInput;
