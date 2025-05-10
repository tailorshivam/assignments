import React from "react";
import { useFinance } from "../context/FinanceContext";
import { Link, useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const { transactions, deleteTransaction } = useFinance();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Transaction History</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>
                <button
                  onClick={() => {
                    console.log(transaction);
                    navigate(`/edit-transaction/${transaction.id}`)}
                  }
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/transactions" className="btn btn-primary mt-4">
        Add New Transaction
      </Link>
    </div>
  );
};

export default TransactionHistory;