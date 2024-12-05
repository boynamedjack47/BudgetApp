import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCar, faUtensils, faFilm, faHeart, faPiggyBank, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import './DueDate.css';

const DueDateComponent = ({ expenses }) => {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const nextWeekDay = (currentDay + 7 > daysInMonth) ? (currentDay + 7 - daysInMonth) : currentDay + 7;

  // Filter expenses for the next 7 days
  const upcomingExpenses = expenses.filter((expense) => {
    if (currentDay <= nextWeekDay) {
      // Same month
      return expense.dueDay >= currentDay && expense.dueDay <= nextWeekDay;
    } else {
      // Spanning to the next month
      return expense.dueDay >= currentDay || expense.dueDay <= nextWeekDay;
    }
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Housing":
        return faHouse;
      case "Transportation":
        return faCar;
      case "Food":
        return faUtensils;
      case "Entertainment":
        return faFilm;
      case "Health":
        return faHeart;
      case "Savings/Investments":
        return faPiggyBank;
      default:
        return faEllipsisVertical;
    }
  };

  return (
    <div className="due-date-component">
      <h2>Upcoming Expenses</h2>
      {upcomingExpenses.length > 0 ? (
        <div className="upcoming-list">
          {upcomingExpenses.map((expense) => (
            <div key={expense.id} className="upcoming-item">
              <FontAwesomeIcon
                icon={getCategoryIcon(expense.category)}
                style={{ marginRight: "10px" }}
              />
              <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)} (Due: The{" "}
              {expense.dueDay}th)
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming expenses within the next 7 days.</p>
      )}
    </div>
  );
};

DueDateComponent.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      dueDay: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DueDateComponent;
