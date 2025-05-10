import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const Reports = () => {
  const { transactions, budgets } = useFinance();

  // Monthly spending trends - Chart data
  const getMonthlySpendingData = () => {
    const monthlyData = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date();
      month.setMonth(i);
      const monthName = month.toLocaleString("default", { month: "long" });
      const totalSpent = transactions
        .filter((t) => new Date(t.date).getMonth() === i)
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      monthlyData.push({ month: monthName, totalSpent });
    }
    return monthlyData;
  };

  // Category-wise expense breakdown
  const getCategoryWiseData = () => {
    const categoryData = [];
    const categories = [
      "Groceries",
      "Salary",
      "Rent",
      "Utilities",
      "Entertainment",
      "Transportation",
      "Others",
    ];

    categories.forEach((category) => {
      const totalSpent = transactions
        .filter((t) => t.category === category)
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      categoryData.push({ name: category, value: totalSpent });
    });
    return categoryData;
  };

  // Total income and expense summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const savings = totalIncome - totalExpense;

  return (
    <div>
      <h2>Reports</h2>

      <div className="mb-4">
        <h5>Total Income, Expenses, and Savings</h5>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expenses: ${totalExpense}</p>
        <p>Savings: ${savings}</p>
      </div>

      <div className="mb-4">
        <h5>Monthly Spending Trends</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getMonthlySpendingData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSpent" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <h5>Category-wise Expense Breakdown</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getCategoryWiseData()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {getCategoryWiseData().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value > 100 ? "#82ca9d" : "#8884d8"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <h5>Financial Summary (Monthly)</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {getMonthlySpendingData().map((data, index) => (
              <tr key={index}>
                <td>{data.month}</td>
                <td>{data.totalSpent}</td>
                <td>{data.totalSpent}</td>
                <td>{totalIncome - totalExpense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
