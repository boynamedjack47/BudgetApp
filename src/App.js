import React, { useState, useEffect } from "react";
import IncomeInput from "./components/IncomeInput";
import FixedExpensesInput from "./components/FixedExpensesInput";
import SavingsGoalInput from "./components/SavingsGoalInput";
import BudgetDisplay from "./components/BudgetDisplay";
import SafeToSpend from "./components/SafeToSpend";
import "./App.css";

function App() {
  // State management
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome
      ? JSON.parse(savedIncome)
      : { type: "salary", amount: 0, breakdown: { annual: 0, monthly: 0, biweekly: 0 } };
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    const savedGoal = localStorage.getItem("savingsGoal");
    return savedGoal ? JSON.parse(savedGoal) : 0;
  });

  // Savings strategy state (with default to "Moderate")
  const [savingsStrategy, setSavingsStrategy] = useState("Moderate");
  const [customSavings, setCustomSavings] = useState(50); // Default to 50% for custom savings

  // Handle savings strategy change
  const handleStrategyChange = (event) => {
    const value = event.target.value;
    setSavingsStrategy(value);

    if (value === "Custom") {
      // Show input for custom savings strategy
      return;
    }
  };

  // Handle custom savings input
  const handleCustomSavingsChange = (event) => {
    const customValue = event.target.value;
    setCustomSavings(customValue);
  };

  // Calculate remaining income after expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingIncome = income.breakdown.monthly - totalExpenses;

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("savingsGoal", JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  return (
    <div className="App">
      <div className="content">
        <h1>Budget Tracker</h1>
        <IncomeInput setIncome={setIncome} />
        <FixedExpensesInput expenses={expenses} setExpenses={setExpenses} />
        <BudgetDisplay
          income={income}
          expenses={expenses}
          savingsGoal={savingsGoal}
        />
        {/* Add select dropdown to change the savings strategy */}
        <div>
          <label htmlFor="strategy">Select Savings Strategy: </label>
          <select
            id="strategy"
            value={savingsStrategy}
            onChange={handleStrategyChange}
          >
            <option value="Aggressive">Aggressive (100%)</option>
            <option value="Moderate">Moderate (50%)</option>
            <option value="Passive">Passive (25%)</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Custom input field */}
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
      {/* Pass remainingIncome and savingsStrategy to SafeToSpend component */}
      <SafeToSpend
        remainingIncome={remainingIncome}
        savingsStrategy={savingsStrategy === "Custom" ? customSavings / 100 : savingsStrategy === "Aggressive" ? 1 : savingsStrategy === "Moderate" ? 0.5 : 0.25}
      />
    </div>
  );
}

export default App;
