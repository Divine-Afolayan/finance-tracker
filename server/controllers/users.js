const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const postUserSignup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // await new User({ username, password: hashedPassword }).save();
        await User.create({ username, password: hashedPassword });

        res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        } else {
            console.error("Server error:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
};


const postUserLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.json({ msg: 'User doesn\'t exist!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({ msg: 'Invalid username or password!' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        res.json({ token, userID: user._id })
    } catch (error) {
        res.json({ message: "Something went wrong" });
    }
}

module.exports = { postUserSignup, postUserLogin } 