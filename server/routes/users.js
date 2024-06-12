const express = require('express');
const router = express.Router();

const { register, login, getAllBudgets, addBudget, updateBudget } = require('../controllers/users')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/budgets/:userID').get(getAllBudgets)
router.route('/add-budget/:userID').post(addBudget)
router.route('/update-budget/:userID/:budgetID').put(updateBudget)

module.exports = router