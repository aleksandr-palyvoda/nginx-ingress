const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const db = require("./models");
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'hfd329f2387fgow3487t3wofhbt3o824f734',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

require("./routes/auth.routes")(app);
require("./routes/404.routes")(app);

app.listen(process.env.PORT || 3000);