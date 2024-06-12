const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    expenses: [
        {
            description: String,
            amount: Number,
            category: String,
            date: { type: Date, default: Date.now },
        }
    ]
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide username'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must provide password']
    },
    budgets: [budgetSchema]
})

const User = mongoose.model('User', UserSchema)
module.exports = User