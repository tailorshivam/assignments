import React, { useEffect, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Line } from 'react-chartjs-2';
import { getCurrencySymbol } from "../utils/currencyUtils";
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const { transactions } = useFinance();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [savings, setSavings] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const { userSettings } = useFinance();
const currencySymbol = getCurrencySymbol(userSettings.currency);

  useEffect(() => {
    let income = 0;
    let expenses = 0;
    let monthlyIncome = {};
    let monthlyExpenses = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' });

      if (transaction.type === 'income') {
        income += transaction.amount;
        monthlyIncome[month] = (monthlyIncome[month] || 0) + transaction.amount;
      } else {
        expenses += transaction.amount;
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transaction.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setRemainingBudget(income - expenses);
    setSavings(income - expenses);

    const allMonths = Array.from(new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpenses)]));
    allMonths.sort((a, b) => new Date(`1 ${a} 2000`) - new Date(`1 ${b} 2000`)); // sort by calendar order

    const monthlyData = allMonths.map(month => ({
      month,
      income: monthlyIncome[month] || 0,
      expenses: monthlyExpenses[month] || 0,
    }));

    setMonthlyData(monthlyData);
  }, [transactions]);

  const lineData = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(item => item.income),
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        fill: false,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(item => item.expenses),
        borderColor: '#F44336',
        backgroundColor: '#F44336',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Total Income</h5>
              <p>{currencySymbol} {totalIncome}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Total Expenses</h5>
              <p>{currencySymbol} {totalExpenses}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Remaining Budget</h5>
              <p>{currencySymbol} {remainingBudget}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5>Savings</h5>
              <p>{currencySymbol} {savings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h5>Monthly Income vs Expenses</h5>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;