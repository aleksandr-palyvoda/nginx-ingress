const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models");
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/health.routes")(app);
require("./routes/404.routes")(app);

app.listen(process.env.PORT || 3000);