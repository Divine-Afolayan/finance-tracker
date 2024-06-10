const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide username'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Must provide password'],
        trim: true
    },
    expenses: [
        {
            amount: { type: Number, required: true },
            category: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    budget: [
        {
            name: { type: String, required: true },
            amountBudgetedIn: { type: Number, required: true, default: 0 },
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)