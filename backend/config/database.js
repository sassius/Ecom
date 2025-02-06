const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Error connecting to Database", error.message));

module.exports = mongoose.connection;
