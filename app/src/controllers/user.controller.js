const db = require("../models");
const User = db.users;

exports.create = (req, res) => {

    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    };

    User.create(user)
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
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    code: 404,
                    message: "Not found user with id " + id
                });
            else res.send(data);
        }).catch(err => {
        res
            .status(500)
            .send({
                code: 500,
                message: "Error retrieving user with id=" + id
            });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            code: 400,
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(data => {
            if (data === 1 || (Array.isArray(data) && data[0] === 1)) {
                res.send({
                    code: 0,
                    message: "User was updated successfully."
                });
            } else {
                res.status(404).send({
                    code: 404,
                    message: `Cannot update user with id=${id}. Maybe user was not found! ${JSON.stringify(data)}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(data => {
            if (data === 1) {
                res.status(204).send({
                    code: 0,
                    message: "user was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    code: 404,
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message: "Could not delete user with id=" + id
            });
        });
};

exports.getAuthUser = (req, res) => {
    const id = Number(req.header('X-UserId'));

    User.findByPk(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    code: 404,
                    message: "Not found user with id " + id
                });
            else res.send(data);
        }).catch(err => {
        res
            .status(500)
            .send({
                code: 500,
                message: "Error retrieving user with id=" + id
            });
    });
};

exports.updateAuthUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            code: 400,
            message: "Data to update can not be empty!"
        });
    }

    const id = Number(req.header('X-UserId'));

    User.update(req.body, {
        where: { id }
    })
        .then(data => {
            if (data === 1 || (Array.isArray(data) && data[0] === 1)) {
                res.send({
                    code: 0,
                    message: "User was updated successfully."
                });
            } else {
                res.status(404).send({
                    code: 404,
                    message: `Cannot update user with id=${id}. Maybe user was not found! ${JSON.stringify(data)}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message: "Error updating user with id=" + id
            });
        });
};