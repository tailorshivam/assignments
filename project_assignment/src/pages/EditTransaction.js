import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const EditTransaction = () => {
  const { id } = useParams();
  const { transactions, setTransactions } = useFinance();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  useEffect(() => {
    const transactionToEdit = transactions.find((t) => String(t.id) === String(id));

    if (transactionToEdit) {
      setFormData({
        type: transactionToEdit.type,
        amount: transactionToEdit.amount,
        category: transactionToEdit.category,
        description: transactionToEdit.description || "",
        date: transactionToEdit.date
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const updatedTransactions = transactions.map((t) =>
      String(t.id) === String(id) ? { ...formData, id } : t
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    alert("Transaction updated!");
    navigate("/transaction-history");
  };

  return (
    <div>
      <h2>Edit Transaction</h2>
      <form>
        <div className="form-group">
          <label>Transaction Type</label>
          <select
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={handleUpdate}
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;