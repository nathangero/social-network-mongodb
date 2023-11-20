const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.DB_NAME);

module.exports = mongoose.connection;