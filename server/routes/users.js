const express = require('express');
const router = express.Router();

const { signup, login, getAllBudgets, addBudget, updateBudget } = require('../controllers/users')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/:id/AllBudgets').get(getAllBudgets)
router.route('/:id/addBudget').post(addBudget)
router.route('/:userID/:budgetID/updateBudget').put(updateBudget)

module.exports = router