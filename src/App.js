import React, { useState, useEffect } from "react";
import IncomeInput from "./components/IncomeInput";
import FixedExpensesInput from "./components/FixedExpensesInput";
import SavingsGoalInput from "./components/SavingsGoalInput";
import BudgetDisplay from "./components/BudgetDisplay";
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
        <SavingsGoalInput setSavingsGoal={setSavingsGoal} />
        <BudgetDisplay
          income={income}
          expenses={expenses}
          savingsGoal={savingsGoal}
        />
      </div>
    </div>
  );
}

export default App;
