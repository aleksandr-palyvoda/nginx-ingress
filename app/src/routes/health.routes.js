module.exports = app => {
    const health = require("../controllers/health.controller");

    const router = require("express").Router();

    router.get("/", health.status);
    router.get("/configs", health.configs);

    app.use('/health', router);
};