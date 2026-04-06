let users = [];

const findByEmail = (email) => users.find(user => user.email === email);

const create = (user) => {
    users.push({ id: users.length + 1, ...user });
};

module.exports = { findByEmail, create };