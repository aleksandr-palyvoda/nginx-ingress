module.exports = app => {
    const error404 = require("../controllers/404.controller");
    app.use('*', error404.handle);
};