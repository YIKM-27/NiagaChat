const express = require('express');
const bcrypt = require('bcrypt');      
const crypto = require('crypto');     
const nodemailer = require('nodemailer'); 
const db = require('./database/connection'); 

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pt.niagachat@gmail.com', 
        pass: 'yfgxcljscpszkqtd'   
    }
});


app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // A. Acak passwordnya
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // B. Bikin kode token buat di email
        const token = crypto.randomBytes(16).toString('hex');

        // C. Simpan ke database
        const query = 'INSERT INTO users (email, password, verify_token) VALUES (?, ?, ?)';
        
        db.query(query, [email, hashedPassword, token], (err, result) => {
            if (err) {
                console.error('Error Database:', err);
                return res.status(500).send('Gagal daftar bro, database error.');
            }

            // D. Kirim Email!
            const mailOptions = {
                from: 'pt.niagachat@gmail.com', // Email lama
                to: email, 
                subject: 'Verifikasi Akun NiagaChat',
                html: `
                    <h2>Halo! Pelanggan yang terhormat</h2>
                    <p>Klik Link di bawah ini untuk memverifikasi akun Anda:</p>
                    <br>
                    <a href="http://localhost:3000/verify?token=${token}" style="background: green; color: white; padding: 20px 30px; text-decoration: none;">Verifikasi Sekarang</a>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error Email:', error);
                    return res.status(500).send('Masuk database, tapi gagal ngirim email.');
                }
                res.send('Pendaftaran Sukses! Cek inbox email lu sekarang bro.');
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server lagi pusing bro.');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server jalan ngebut di http://localhost:${PORT}`);
});