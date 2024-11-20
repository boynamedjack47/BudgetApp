import React, { useState } from "react";
import IncomeInput from "./components/IncomeInput";
import FixedExpensesInput from "./components/FixedExpensesInput";
import SavingsGoalInput from "./components/SavingsGoalInput";
import BudgetDisplay from "./components/BudgetDisplay";

const App = () => {
  const [income, setIncome] = useState({ type: "", amount: 0 });
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(0);

  return (
    <div className="App">
    <div className="content">
      <h1>Budget Tracker</h1>
      <IncomeInput setIncome={setIncome} />
      <FixedExpensesInput expenses={expenses} setExpenses={setExpenses} />
      <SavingsGoalInput setSavingsGoal={setSavingsGoal} />
      <BudgetDisplay income={income} expenses={expenses} savingsGoal={savingsGoal} />
    </div>
  </div>
  
  );
};

export default App;
