import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

const AddTransaction = () => {
  const { addTransaction } = useFinance();
  const history = useHistory();

  const [transaction, setTransaction] = useState({
    type: 'Income',
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const [categories, setCategories] = useState([
    'Groceries', 'Salary', 'Rent', 'Utilities', 'Entertainment', 'Transportation', 'Others'
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...transaction,
      id: new Date().getTime(), // Unique ID based on timestamp
    };
    addTransaction(newTransaction);
    history.push('/history'); // Redirect to Transaction History page
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            name="type"
            className="form-control"
            value={transaction.type}
            onChange={handleChange}
            required
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            value={transaction.amount}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={transaction.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={transaction.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={transaction.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;