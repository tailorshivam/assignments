import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Budgets = () => {
  const { budgets = [], setBudgets, transactions = [] } = useFinance();
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
  });

  const defaultCategories = [
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount) {
      setBudgets([
        ...budgets,
        {
          ...newBudget,
          amount: parseFloat(newBudget.amount),
          id: new Date().getTime(),
        },
      ]);
      setNewBudget({ category: "", amount: "" });
    }
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const groupedBudgets = [...new Set(budgets.map((b) => b.category))];

  return (
    <div>
      <h2>Budgets</h2>

      <div className="mb-4">
        <h5>Add New Budget</h5>
        <div className="form-inline">
          <select
            name="category"
            className="form-control mr-2"
            value={newBudget.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {defaultCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            className="form-control mr-2"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={handleChange}
          />

          <button onClick={handleAddBudget} className="btn btn-primary">
            Add Budget
          </button>
        </div>
      </div>

      <div>
        <h5>Current Budgets</h5>
        {groupedBudgets.map((category) => {
          const categoryBudgets = budgets.filter((b) => b.category === category);
          const totalBudget = categoryBudgets.reduce((sum, b) => sum + b.amount, 0);
          const totalSpent = transactions
            .filter((t) => t.category === category && t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
          const progress = Math.min((totalSpent / totalBudget) * 100, 100).toFixed(2);

          return (
            <div key={category} className="mb-4">
              <h6>{category}</h6>
              <p>Budget: ${totalBudget}</p>
              <p>Spent: ${totalSpent}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
              {categoryBudgets.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleDeleteBudget(b.id)}
                  className="btn btn-danger mt-2 mr-2"
                >
                  Delete {b.amount}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;