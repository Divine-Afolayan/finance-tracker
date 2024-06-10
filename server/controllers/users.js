const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const postUserSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        // await new User({ username, password: hashedPassword }).save();
        await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user' });
    }
};


const postUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: 'User doesn\'t exist!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({ msg: 'Invalid username or password!' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' })
        res.json({ token, userID: user._id })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// add expense
const postUserExpense = async (req, res) => {
    try {
        // todo: find out where we get userID
        // todo: Trust in yourself, you can do it
        const { userId, amount, category } = req.body;
    } catch (error) {
        res.status(500).json({ error: 'Error adding expense' });
    }
}

// add budget
const postUserBudget = async (req, res) => { }


module.exports = { postUserSignup, postUserLogin, postUserExpense, postUserBudget } 