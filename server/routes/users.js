const express = require('express');
const router = express.Router();

const { postUserSignup, postUserLogin, postUserExpense, postUserBudget } = require('../controllers/users')

router.route('/signup').post(postUserSignup)
router.route('/login').post(postUserLogin)
router.route('/addExpense').post(postUserExpense)
router.route('/addBudget').post(postUserBudget)

module.exports = router