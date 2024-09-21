const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User Already Exists" });
        }

        // If user doesn't exist, hash password and save
        const hashpassword = bcrypt.hashSync(password);
        const newUser = new User({ email, username, password: hashpassword });
        await newUser.save();

        // Success response
        res.status(200).json({ message: "Sign Up successful" });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ message: "Server error" });
    }
});


//Sign In
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(200).json({ message: 'please Sign-Up First' });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.status(200).json({ message: 'Incorrect Password' });
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ others });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'Unexpected Error' });
    }
});

module.exports = router;