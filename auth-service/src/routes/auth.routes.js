module.exports = app => {
    const users = require("../controllers/auth.controller");

    const router = require("express").Router();

    router.post("/login", users.login);
    router.get("/logout", users.logout);
    router.post("/register", users.register);
    router.get("/auth", users.auth);
    router.post("/auth", users.auth);
    router.get("/signin", users.signin);

    app.use('/', router);
};