import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const FinanceContext = createContext();
export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userSettings, setUserSettings] = useState({
    currency: "USD",
    email: "",
    notifications: false,
  });

  useEffect(() => {
    const storedTransactions = getFromStorage("transactions") || [];
    const storedSettings = getFromStorage("userSettings") || {
      currency: "USD",
      email: "",
      notifications: false,
    };

    setTransactions(storedTransactions);
    setUserSettings(storedSettings);
  }, []);

  useEffect(() => {
    saveToStorage("transactions", transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage("userSettings", userSettings);
  }, [userSettings]);

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now() };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (updated) => {
    setTransactions(
      transactions.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        budgets,
        setBudgets,
        transactions,
        setTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        userSettings,
        setUserSettings,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
