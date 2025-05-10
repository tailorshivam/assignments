import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Transactions = () => {
  const { transactions, setTransactions } = useFinance();

  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const incomeCategories = ["Salary", "Freelance", "Investment", "Other"];
  const expenseCategories = [
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

  const handleAddTransaction = () => {
    const newTransaction = {
      id: new Date().getTime(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    setTransactions([...transactions, newTransaction]);
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, newTransaction])
    );

    alert("Transaction added!");

    setAmount("");
    setCategory(type === "income" ? "Salary" : "Groceries");
    setDescription("");
    setDate("");
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form>
        <div className="form-group">
          <label>Transaction Type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              const newType = e.target.value;
              setType(newType);
              setCategory(newType === "income" ? "Salary" : "Groceries");
            }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {(type === "income" ? incomeCategories : expenseCategories).map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default Transactions;
