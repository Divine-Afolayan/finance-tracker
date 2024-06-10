const express = require('express');
const router = express.Router();

const { postUserSignup, postUserLogin } = require('../controllers/users')

router.route('/signup').post(postUserSignup)
router.route('/login').post(postUserLogin)

module.exports = router