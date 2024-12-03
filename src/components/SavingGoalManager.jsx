// src/components/SavingsStrategyInput.js
import React from 'react';
//import './SavingGoal.css';

const SavingsStrategyInput = ({
  savingsStrategy,
  customSavings,
  handleStrategyChange,
  handleCustomSavingsChange,
}) => {
  return (
    <div>
      <div>
        <label htmlFor="strategy">Select Savings Strategy: </label>
        <select id="strategy" value={savingsStrategy} onChange={handleStrategyChange}>
          <option value="Aggressive">Aggressive (100%)</option>
          <option value="Moderate">Moderate (50%)</option>
          <option value="Passive">Passive (25%)</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {savingsStrategy === "Custom" && (
        <div>
          <label htmlFor="customSavings">Enter Custom Savings %: </label>
          <input
            type="number"
            id="customSavings"
            value={customSavings}
            onChange={handleCustomSavingsChange}
            min="0"
            max="100"
          />
          <span>%</span>
        </div>
      )}
    </div>
  );
};

export default SavingsStrategyInput;
