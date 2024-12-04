import React, { useState } from "react";
import PropTypes from "prop-types";
//import './IncomeInput.css';

const IncomeInput = ({ setIncome }) => {
  const [type, setType] = useState("hourly");
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(40);
  const [overtimeInfo, setOvertimeInfo] = useState(null); // To display overtime breakdown
  const [showOvertime, setShowOvertime] = useState(false); // Toggle overtime details visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    let annualIncome;
    let overtimeHours = 0;
    let regularHours = hours;

    // Calculate income based on hourly or salary type
    if (type === "hourly") {
      // If hours are above 40, calculate overtime
      if (hours > 40) {
        regularHours = 40; // Regular hours are capped at 40
        overtimeHours = hours - 40; // Overtime hours
      }
      const weeklyIncome = regularHours * amount + overtimeHours * amount * 1.5;
      annualIncome = weeklyIncome * 52; // 52 weeks in a year
    } else {
      annualIncome = amount; // Annual salary
    }

    // Breakdown for monthly and bi-weekly income
    const monthlyIncome = annualIncome / 12;
    const biWeeklyIncome = annualIncome / 26;

    // Set the income state and include overtime information if applicable
    setIncome({
      type,
      amount: annualIncome,
      breakdown: {
        annual: annualIncome.toFixed(2),
        monthly: monthlyIncome.toFixed(2),
        biweekly: biWeeklyIncome.toFixed(2),
      },
    });

    // Update overtime display information
    if (overtimeHours > 0) {
      setOvertimeInfo({
        regularHours,
        overtimeHours,
        overtimeIncome: (overtimeHours * amount * 1.5).toFixed(2),
      });
    } else {
      setOvertimeInfo(null); // No overtime if hours <= 40
    }
  };

  const toggleOvertimeVisibility = () => {
    setShowOvertime((prevState) => !prevState); // Toggle visibility of overtime info
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

      {/* Button to toggle overtime info visibility */}
      {overtimeInfo && (
        <button type="button" onClick={toggleOvertimeVisibility} className="toggle-overtime-button">
          {showOvertime ? "Hide Overtime Info" : "? Overtime Info"}
        </button>
      )}

      {/* Overtime Information, visible when the button is clicked */}
      {showOvertime && overtimeInfo && (
        <div className="overtime-info">
          <h3>Overtime Details:</h3>
          <p>Regular Hours: {overtimeInfo.regularHours} hours</p>
          <p>Overtime Hours: {overtimeInfo.overtimeHours} hours</p>
          <p>Overtime Income: ${overtimeInfo.overtimeIncome}</p>
        </div>
      )}
    </form>
  );
};

IncomeInput.propTypes = {
  setIncome: PropTypes.func.isRequired,
};

export default IncomeInput;