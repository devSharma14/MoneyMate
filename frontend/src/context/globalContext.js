import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  // -------------------- State --------------------
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [limits, setLimits] = useState([]);
  const [error, setError] = useState(null);

  // -------------------- Income --------------------
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
      toast.success("Income added successfully!");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
      toast.success("Income deleted!");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const totalIncome = () =>
    incomes.reduce((acc, item) => acc + Number(item.amount), 0);

  // -------------------- Expense --------------------
  const addExpense = async (expense) => {
    try {
      const today = new Date().toDateString();
      const todayLimitObj = limits.find(
        (l) => new Date(l.date).toDateString() === today
      );
      const todayLimit = todayLimitObj ? todayLimitObj.amount : Infinity;

      const todayExpenses = expenses
        .filter((e) => new Date(e.date).toDateString() === today)
        .reduce((acc, e) => acc + Number(e.amount), 0);

      if (todayExpenses + Number(expense.amount) > todayLimit) {
        const msg = `Expense exceeds today's limit of $${todayLimit}`;
        setError(msg);
        toast.error(msg);
        return;
      }

      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
      toast.success("Expense added successfully!");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
      toast.success("Expense deleted!");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  // -------------------- Transaction History --------------------
  const transactionHistory = () => {
    return [...incomes, ...expenses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  };

  // -------------------- Limits --------------------
  const addLimit = async (limit) => {
    try {
      const { amount } = limit;
      const remainingBalance = totalBalance() - totalLimit(new Date());

      if (Number(amount) > remainingBalance) {
        const msg = `Cannot add limit of $${amount}. Only $${remainingBalance} available.`;
        setError(msg);
        toast.error(msg);
        return;
      }

      await axios.post(`${BASE_URL}add-limit`, limit);
      getLimits();
      toast.success("Limit added successfully!");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };


  const getLimits = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-limits`);
      setLimits(response.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
  };

  const totalLimit = (date = new Date()) => {
    const todayStr = date.toDateString();
    return limits
      .filter((l) => new Date(l.date).toDateString() === todayStr)
      .reduce((acc, l) => acc + Number(l.amount), 0);
  };

  const todayLimitLeft = (date = new Date()) => {
    const todayStr = date.toDateString();
    const todayLimit = limits
      .filter((l) => new Date(l.date).toDateString() === todayStr)
      .reduce((acc, l) => acc + Number(l.amount), 0);

    const todayExpenses = expenses
      .filter((e) => new Date(e.date).toDateString() === todayStr)
      .reduce((acc, e) => acc + Number(e.amount), 0);
    return todayLimit - todayExpenses;
  };

  // -------------------- Provider --------------------
  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        limits,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        addLimit,
        getLimits,
        totalLimit,
        todayLimitLeft,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
