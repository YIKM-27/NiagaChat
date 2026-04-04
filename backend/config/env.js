require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'defaultsecret',
    DB_HOST: process.env.DB_HOST || 'localhost',
    // Add other env vars
};
