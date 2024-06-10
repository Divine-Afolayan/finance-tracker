const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide username'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Must provide password'],
        trim: true
    },
    budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }]
})

module.exports = mongoose.model('User', UserSchema)