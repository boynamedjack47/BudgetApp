import React, { useState, useEffect } from "react";
import IncomeInput from "./components/IncomeInput";
import FixedExpensesInput from "./components/FixedExpensesInput";
import SavingsGoalInput from "./components/SavingsGoalInput";
import BudgetDisplay from "./components/BudgetDisplay";
import SafeToSpend from "./components/SafeToSpend";
import PieChart from "./components/PieChart"; // Ensure PieChart is imported
import "./App.css";

function App() {
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

  const [savingsStrategy, setSavingsStrategy] = useState("Moderate");
  const [customSavings, setCustomSavings] = useState(50);

  const handleStrategyChange = (event) => {
    const value = event.target.value;
    setSavingsStrategy(value);
  };

  const handleCustomSavingsChange = (event) => {
    const customValue = event.target.value;
    setCustomSavings(customValue);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingIncome = income.breakdown.monthly - totalExpenses;

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("savingsGoal", JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  
  useEffect(() => {
    localStorage.setItem("savingsStrategy", savingsStrategy); // Store as plain string
  }, [savingsStrategy]);
  
  useEffect(() => {
    localStorage.setItem("customSavings", JSON.stringify(customSavings)); // Store as JSON
  }, [customSavings]);

  const pieChartData = expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    const existingCategory = acc.find((item) => item.label === category);

    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ label: category, value: expense.amount });
    }

    return acc;
  }, []);

  return (
    <div className="App">
      <div className="content">
        <h1>Budget Tracker</h1>
        <IncomeInput setIncome={setIncome} />
        <FixedExpensesInput expenses={expenses} setExpenses={setExpenses} />
        <BudgetDisplay income={income} expenses={expenses} savingsGoal={savingsGoal} />
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

      {/* Group SafeToSpend and PieChart in the same div */}
      <div className="safe-to-spend-container">
        <SafeToSpend
          remainingIncome={remainingIncome}
          savingsStrategy={savingsStrategy === "Custom" ? customSavings / 100 : savingsStrategy === "Aggressive" ? 1 : savingsStrategy === "Moderate" ? 0.5 : 0.25}
        />
        <PieChart data={pieChartData} />
      </div>
    </div>
  );
}

export default App;
