// to fetch the current available balance
const Income = require('../models/IncomeModel.js');
const Expense = require('../models/ExpenseModel.js');

const getAvailableBalance = async () => {
    const totalIncomeAgg = await Income.aggregate([
        { $group: { _id: null, total: {$sum: "$amount"} } }
    ]);
    const totalExpenseAgg = await Expense.aggregate([
        { $group: { _id: null, total: {$sum: "$amount"} } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;
    console.log("Available Balance:", totalIncome - totalExpense);
    return totalIncome - totalExpense;  
};

module.exports = { getAvailableBalance };