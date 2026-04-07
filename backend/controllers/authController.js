const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../database/connection');

const login = async (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        
        const user = results[0];
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if (user.is_verified == 0) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
    });
};

const verify = (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token required' });
    
    db.query('UPDATE users SET is_verified = 1 WHERE verify_token = ?', [token], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (result.affectedRows === 0) return res.status(400).json({ message: 'Invalid token' });
        res.send('<h2>Verifikasi Berhasil!</h2><p>Akun Anda sudah diverifikasi. <a href="/pages/login/index.html">Login sekarang</a></p>');
    });
};

module.exports = { login, verify };
