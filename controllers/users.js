const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// DATA GIẢ
let users = [
    {
        _id: "1",
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: { name: "admin" },
        loginCount: 0,
        isDeleted: false
    }
];

module.exports = {

    // CREATE
    CreateAnUser: async function (username, password, email, role) {
        const hash = await bcrypt.hash(password, 10);

        let newUser = {
            _id: Date.now().toString(),
            username,
            password: hash,
            email,
            role: { name: "user" },
            loginCount: 0,
            isDeleted: false
        };

        users.push(newUser);
        return newUser;
    },

    // FIND
    FindUserByUsername: async function (username) {
        return users.find(u => u.username === username && !u.isDeleted);
    },

    FindUserByEmail: async function (email) {
        return users.find(u => u.email === email && !u.isDeleted);
    },

    FindUserByToken: async function (token) {
        return users.find(u => u.forgotPasswordToken === token);
    },

    FindUserById: async function (id) {
        return users.find(u => u._id == id && !u.isDeleted);
    }
};