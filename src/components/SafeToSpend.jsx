import React from "react";
import PropTypes from "prop-types";
import "./SafeToSpend.css"; // Import the styles for SafeToSpend

const SafeToSpend = ({ remainingIncome, savingsStrategy }) => {
  // Calculate the amount to save based on the savings strategy
  const amountToSave = remainingIncome * savingsStrategy;

  // Calculate the safe-to-spend amount
  const safeToSpendAmount = remainingIncome - amountToSave;

  // Calculate the daily amount (divide by 30 as a simple approach)
  const dailyAmount = safeToSpendAmount / 30;

  // Calculate the percentage of income saved
  const progressWidth = (safeToSpendAmount / remainingIncome) * 100;

  // Determine the color of the progress bar based on safeToSpendAmount
  let progressClass = "green"; // Default to green

  if (safeToSpendAmount < 0) {
    progressClass = "red"; // If negative, show red (over-budget)
  } else if (safeToSpendAmount >= remainingIncome * 0.75) {
    progressClass = "green"; // If between 75% and 100%, show green
  } else if (safeToSpendAmount >= remainingIncome * 0.50) {
    progressClass = "green-light"; // If between 50% and 75%, show light green
  } else {
    progressClass = "yellow"; // If between 0% and 50%, show yellow
  }

  // Use the same class for the text as the progress bar
  const textClass = progressClass; 

  return (
    <div className="safe-to-spend">
      <h2>Safe to Spend</h2>

      {/* Safe to Spend Amount */}
      <div className="amount">
        <span className="safe-to-spend-label">Monthly Budget: </span>
        <span className={`safe-to-spend-amount ${textClass}`}>
          ${safeToSpendAmount.toFixed(2)}
        </span>
      </div>

      {/* Daily Spendable Amount */}
      <div className="amount">
        <span className="safe-to-spend-label">Daily Budget: </span>
        <span className={`safe-to-spend-amount ${textClass}`}>
          ${dailyAmount.toFixed(2)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className={`progress-bar ${progressClass}`}
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {/* Message */}
      <p>
        Based on your savings strategy, this is how much you have left to spend this month.
      </p>

    </div>
  );
};

SafeToSpend.propTypes = {
  remainingIncome: PropTypes.number.isRequired,
  savingsStrategy: PropTypes.number.isRequired, // Strategy is a numeric value representing how much is saved
};

export default SafeToSpend;
