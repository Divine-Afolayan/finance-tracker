const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// register user
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        // gen salt with bcrypt
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user' });
    }
};


// login user
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: 'User doesn\'t exist!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({ msg: 'Invalid username or password!' })
        }

        // create jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' })
        res.json({ token, userID: user._id })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// budget controllers

// getting all budgets

const getAllBudgets = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        res.status(200).json({ budgets: user.budgets })
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

// adding budget
const addBudget = async (req, res) => {
    const { name, amount } = req.body
    const { userID } = req.params

    try {
        const user = await User.findById({ userID })

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        const newBudget = {
            name,
            amount,
            expenses: []
        }

        user.budgets.push(newBudget)
        await user.save()

        res.status(201).json({ msg: 'Budget creation is a success' })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

// updating budgets

const updateBudget = async (req, res) => {
    const { name, amount } = req.body;
    const { userID, budgetID } = req.params

    try {
        const user = await User.findById(userID)

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        const budget = user.budgets.id(budgetID)

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        budget.name = name || budget.name
        budget.amount = amount || budget.amount

        await user.save()

        res.status(200).json({ msg: 'budget update is a success', budgets: user.budgets })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

// deleting budgets

const deleteBudget = async (req, res) => {
    const { userID, budgetID } = req.params

    try {
        const user = await User.findById(userID)

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        const budget = user.budgets.id(budgetID)

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        budget.remove()

        await user.save()


        res.status(200).json({ msg: 'Budget deletion successful', budgets: user.budgets });
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

module.exports = { register, login, getAllBudgets, addBudget, updateBudget, deleteBudget } 