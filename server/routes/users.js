const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getAllBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    deleteAccount,
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/users')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/delete-account/:userID').delete(deleteAccount)
router.route('/budgets/:userID').get(getAllBudgets)
router.route('/add-budget/:userID').post(addBudget)
router.route('/update-budget/:userID/:budgetID').put(updateBudget)
router.route('/delete-budget/:userID/:budgetID').delete(deleteBudget)
router.route('/expenses/:userID/:budgetID').get(getAllExpenses)
router.route('/add-expense/:userID/:budgetID').post(addExpense)
router.route('/delete-budget/:userID/:budgetID/:expenseID').put(updateExpense)
router.route('/delete-budget/:userID/:budgetID/:expenseID').delete(deleteExpense)

module.exports = router