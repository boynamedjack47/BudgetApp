import React, { useState } from "react";
import PropTypes from "prop-types";
//import './IncomeInput.css';


const IncomeInput = ({ setIncome }) => {
  const [type, setType] = useState("hourly");
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(40);

  const handleSubmit = (e) => {
    e.preventDefault();

    let annualIncome;

    if (type === "hourly") {
      const regularHours = Math.min(hours, 40);
      const overtimeHours = Math.max(hours - 40, 0);
      const weeklyIncome = regularHours * amount + overtimeHours * amount * 1.5;
      annualIncome = weeklyIncome * 52; // 52 weeks in a year
    } else {
      annualIncome = amount; // Annual salary
    }

    const monthlyIncome = annualIncome / 12;
    const biWeeklyIncome = annualIncome / 26;

    setIncome({
      type,
      amount: annualIncome,
      breakdown: {
        annual: annualIncome.toFixed(2),
        monthly: monthlyIncome.toFixed(2),
        biweekly: biWeeklyIncome.toFixed(2),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="income-input-form">
      <h2>Enter Your Income</h2>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)} className="select-input">
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
          className="input-field"
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
            className="input-field"
          />
        </label>
      )}
      <button type="submit" className="submit-button">Calculate Income</button>
    </form>
  );
};

IncomeInput.propTypes = {
  setIncome: PropTypes.func.isRequired,
};

export default IncomeInput;
