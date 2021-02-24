const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model")(mongoose);
db.role = require("./role.model");
db.tutorials = require("./tutorial.model")(mongoose);
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;