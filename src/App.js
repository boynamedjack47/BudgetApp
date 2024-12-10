import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IncomeInput from "./components/IncomeInput";
import FixedExpensesInput from "./components/FixedExpensesInput";
import SavingsGoalInput from "./components/SavingsGoalInput";
import BudgetDisplay from "./components/BudgetDisplay";
import SafeToSpend from "./components/SafeToSpend";
import PieChart from "./components/PieChart";
import DailyCheckIn from "./components/DailyCheckIn";
import DueDateComponent from "./components/DueDate";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const [savingsStrategy, setSavingsStrategy] = useState(() => {
    return localStorage.getItem("savingsStrategy") || "Moderate"; // Default to "Moderate"
  });

  const [customSavings, setCustomSavings] = useState(() => {
    const savedCustomSavings = localStorage.getItem("customSavings");
    return savedCustomSavings ? JSON.parse(savedCustomSavings) : 50; // Default to 50%
  });

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingIncome = income.breakdown.monthly - totalExpenses;

  // Calculate monthly savings based on the strategy
  const monthlySavings =
    savingsStrategy === "Custom"
      ? (remainingIncome * customSavings) / 100
      : savingsStrategy === "Aggressive"
      ? remainingIncome
      : savingsStrategy === "Moderate"
      ? remainingIncome * 0.5
      : remainingIncome * 0.25;

  // Calculate pie chart data from expenses
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

  // Function to calculate how much money is safe to spend based on the savings strategy
  const safeToSpendAmount = () => {
    const savingsMultiplier =
      savingsStrategy === "Custom"
        ? customSavings / 100
        : savingsStrategy === "Aggressive"
        ? 1
        : savingsStrategy === "Moderate"
        ? 0.5
        : 0.25;

    const savingsAmount = remainingIncome * savingsMultiplier;
    const safeAmount = remainingIncome - savingsAmount;
    const dailyBudget = safeAmount / 30;

    return dailyBudget;
  };

  // Handlers for saving strategy and custom savings
  const handleStrategyChange = (event) => {
    const value = event.target.value;
    setSavingsStrategy(value);
  };

  const handleCustomSavingsChange = (event) => {
    const customValue = event.target.value;
    setCustomSavings(customValue);
  };

  // Save states to localStorage whenever they change
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
    localStorage.setItem("savingsStrategy", savingsStrategy);
  }, [savingsStrategy]);

  useEffect(() => {
    localStorage.setItem("customSavings", JSON.stringify(customSavings));
  }, [customSavings]);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <h1>Budget Tracker</h1>
          <Routes>
            {/* Route for income input */}
            <Route path="/income" element={
              <div className="incomeinput">
                <IncomeInput setIncome={setIncome} />
              </div>
            } />

            {/* Route for expenses input */}
            <Route path="/expenses" element={
              <div className="expenseinput">
                <FixedExpensesInput expenses={expenses} setExpenses={setExpenses} />
              </div>
            } />

            {/* Route for dashboard (showing income, budget, etc.) */}
            <Route path="/" element={
              <div className="maincontent">
                <BudgetDisplay
                  income={income}
                  expenses={expenses}
                  remainingIncome={remainingIncome}
                  monthlySavings={monthlySavings}
                />
              </div>
            } />

<Route path="/savings" element={
  <div>
    <label htmlFor="strategy">Select Savings Strategy: </label>
    <select id="strategy" value={savingsStrategy} onChange={handleStrategyChange}>
      <option value="Aggressive">Aggressive (100%)</option>
      <option value="Moderate">Moderate (50%)</option>
      <option value="Passive">Passive (25%)</option>
      <option value="Custom">Custom</option>
    </select>

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

    {/* Pass monthlySavings to SavingsGoalInput */}
    <SavingsGoalInput
  savingsStrategy={savingsStrategy}
  remainingIncome={remainingIncome}
  monthlySavings={monthlySavings}
/>

  </div>
} />


            <Route path="/reports" element={
              // safe-to-spend-container
              <div className="grid-layout">
                <div>
                  <SafeToSpend
                    remainingIncome={remainingIncome}
                    savingsStrategy={
                      savingsStrategy === "Custom"
                        ? customSavings / 100
                        : savingsStrategy === "Aggressive"
                        ? 1
                        : savingsStrategy === "Moderate"
                        ? 0.5
                        : 0.25
                    }
                  />
                </div>

                {/* Expense Distribution Pie Chart */}
                <div>
                  <PieChart data={pieChartData} />
                </div>

                {/* Daily Check-In Section */}
                <div>
                  <DailyCheckIn safeToSpendAmount={safeToSpendAmount} />
                </div>

                {/* Upcoming Expenses Component */}
                <div>
                  <DueDateComponent expenses={expenses} />
                </div>
             </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;