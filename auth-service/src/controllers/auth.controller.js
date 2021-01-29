const db = require("../models");
const User = db.users;

exports.register = (req, res) => {

    const newUser = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };

    User.findOne({
        where: {
            username: newUser.username
        }
    }).then(user => {
        if (!user) {
            User.create(newUser)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        code: 500,
                        message:
                            err.message || "Some error occurred while creating the user."
                    });
                });
        } else {
            res.status(400).send({
                code: 400,
                message: "Username already exists."
            });
        }
    }).catch(err => {
        res
            .status(500)
            .send({
                code: 500,
                message: "Internal Server Error"
            });
    });
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        where: {
            username
        }
    }).then(user => {
        if (!user || !User.validPassword(user, password)) {
            res.status(401).send({
                code: 401,
                message: "Unauthorized"
            });
        } else {
            req.session.user = user.id;
            res.header('X-UserId', user.id);
            res.send({
                code: 200,
                message: "Ok"
            });
        }
    }).catch(err => {
        res
            .status(500)
            .send({
                code: 500,
                message: "Internal Server Error " + err.message
            });
    });
};

exports.logout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.send({
            code: 200,
            message: "Ok"
        });
    } else {
        res.status(401).send({
            code: 401,
            message: "Unauthorized"
        });
    }
};

exports.auth = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.header('X-UserId', req.session.user);
        res.send({
            code: 200,
            message: "Ok"
        });
    } else {
        res.status(401).send({
            code: 401,
            message: "Unauthorized"
        });
    }
};

exports.signin = (req, res) => {
    res.status(401).send({
        code: 401,
        message: "Unauthorized"
    });
};