const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/users');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
};

const verify = (req, res) => {
    // Implement verification logic
    res.json({ message: 'Verification successful' });
};

module.exports = { login, register, verify };
