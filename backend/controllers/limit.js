const Limit = require('../models/Limits.js');
const mongoose = require('mongoose');
exports.addLimits = async (req, res) => {
    const { date, amount } = req.body;
    console.log(date, amount)

    try {
        // Validation
        if (!date || !amount) {
            return res.status(400).json({ message: 'All fields (date, amount, title) are required' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Create a new limit instance using the Limit model
        const limit = new Limit({
            date,
            amount
        });

        // Save the limit to the database
        await limit.save();

        return res.status(201).json({ message: 'Limit added successfully' });
    } catch (error) {
        console.error('Error adding Limit:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getLimits = async (req, res) => {
    try {
        const incomes = await Limit.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

