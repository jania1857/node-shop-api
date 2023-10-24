const {db} = require("../../db.connection");
const bcrypt = require('bcrypt');
const {response} = require("express");

async function register(req, res, next) {
    const email = req.body.email;
    try {
        const result = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

        if (result == null) {

            bcrypt.hash(req.body.password, 10, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error: error
                    });
                } else {
                    try {

                        await db.none('INSERT INTO users(email, password) VALUES ($1, $2)', [email, hash]);
                        return res.status(201).json({
                            message: "User created successfully"
                        });
                    } catch (error) {
                        return res.status(500).json({
                            message: error.message ? error.message : 'Something went wrong'
                        });
                    }
                }
            })
        } else {
            return res.status(409).json({
                message: "User with provided email already exists"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.params.userId;
        await db.none('DELETE FROM users WHERE id = $1', [id]);
        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function login(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const result = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        if (result == null) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        } else {
            console.log("Dupa");
            bcrypt.compare(password, result.password, (error, resp) => {
                if (error) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    })
                }
                if (resp) {
                    return res.status(200).json({
                        message: "Auth successful"
                    })
                }
                return res.status(401).json({
                    message: "Authentication failed"
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

module.exports = {
    register,
    deleteUser,
    login
}