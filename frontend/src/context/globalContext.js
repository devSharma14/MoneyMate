import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

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
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const totalIncome = () =>
        incomes.reduce((acc, item) => acc + Number(item.amount), 0);

    // -------------------- Expense --------------------
    const addExpense = async (expense) => {
        try {
            // Calculate today's limit
            const today = new Date().toDateString(); // e.g., "Wed Sep 04 2025"
            const todayLimitObj = limits.find(
                (l) => new Date(l.date).toDateString() === today
            );
            const todayLimit = todayLimitObj ? todayLimitObj.amount : Infinity;

            // Calculate today's total expenses
            const todayExpenses = expenses
                .filter((e) => new Date(e.date).toDateString() === today)
                .reduce((acc, e) => acc + e.amount, 0);

            // Check if adding this expense exceeds the limit
            if (todayExpenses + expense.amount > todayLimit) {
                setError(`Expense exceeds today's limit of $${todayLimit}`);
                return; // Stop adding
            }

            // Otherwise, add normally
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };


    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
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
    const addLimit = (limit) => {
        const newLimit = {
            ...limit,
            amount: Number(limit.amount),
            _id: Date.now().toString(), // temporary unique id
        };
        setLimits((prev) => [...prev, newLimit]);
        setError("");
    };

    const getLimits = () => limits;

    const totalLimit = (date = new Date()) => {
        const todayStr = date.toDateString();
        return limits
            .filter((l) => new Date(l.date).toDateString() === todayStr)
            .reduce((acc, l) => acc + Number(l.amount), 0);
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
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
