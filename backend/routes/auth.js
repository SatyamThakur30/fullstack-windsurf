const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', 
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const { _id, email, name } = req.user;
        res.json({
            token: req.user.generateJWT(),
            user: { _id, email, name }
        });
    }
);

// Protected routes
router.get('/me', auth, (req, res) => {
    res.json(req.user);
});

// Logout route
router.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Test protected route
router.get('/protected', auth, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
