import React, { useState, useEffect } from "react";
import "./DailyCheckIn.css";

const DailyCheckIn = ({ safeToSpendAmount, customSavings }) => {
  const [dailyBudget, setDailyBudget] = useState(0);
  const [spentYesterday, setSpentYesterday] = useState("");
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem("dailyCheckInStreak");
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });
  const [lastCheckInDate, setLastCheckInDate] = useState(() => {
    const savedDate = localStorage.getItem("lastCheckInDate");
    return savedDate ? new Date(savedDate) : null;
  });

  useEffect(() => {
    // Flip logic for custom savings
    const budget = safeToSpendAmount();
    const adjustedBudget = customSavings
      ? budget * (1 - customSavings / 100) // Flip custom savings here (subtract savings from total)
      : budget;

    setDailyBudget(adjustedBudget ? parseFloat(adjustedBudget.toFixed(2)) : 0);
  }, [safeToSpendAmount, customSavings])

  const isCheckInAllowed = () => {
    const today = new Date().toISOString().split("T")[0]; // Get only the date part (YYYY-MM-DD)
    const lastDate = lastCheckInDate ? lastCheckInDate.toISOString().split("T")[0] : null;
    return today !== lastDate;
  };

  const handleCheckIn = () => {
    if (!spentYesterday) return;

    const spentAmount = parseFloat(spentYesterday);
    if (!isNaN(spentAmount) && spentAmount <= dailyBudget) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    const today = new Date();
    setLastCheckInDate(today);
    localStorage.setItem("lastCheckInDate", today.toISOString());
    localStorage.setItem("dailyCheckInStreak", streak + 1);
    setSpentYesterday("");
  };

  useEffect(() => {
    localStorage.setItem("dailyCheckInStreak", streak.toString());
  }, [streak]);

  return (
    <div className="daily-check-in">
      <h3>Daily Check-In</h3>
      <p>Daily Budget: ${dailyBudget}</p>
      {!isCheckInAllowed() ? (
        <p>You have already checked in today. Come back tomorrow!</p>
      ) : (
        <>
          <input
            type="number"
            placeholder="Amount spent yesterday"
            value={spentYesterday}
            onChange={(e) => setSpentYesterday(e.target.value)}
          />
          <button onClick={handleCheckIn}>Check In</button>
        </>
      )}
      <p>Streak: {streak} day(s) under budget</p>
    </div>
  );
};

export default DailyCheckIn;
