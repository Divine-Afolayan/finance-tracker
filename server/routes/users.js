const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getAllBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    deleteAccount
} = require('../controllers/users')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/delete-account/:userID').delete(deleteAccount)
router.route('/budgets/:userID').get(getAllBudgets)
router.route('/add-budget/:userID').post(addBudget)
router.route('/update-budget/:userID/:budgetID').put(updateBudget)
router.route('/delete-budget/:userID/:budgetID').delete(deleteBudget)

module.exports = router