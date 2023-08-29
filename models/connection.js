require("dotenv").config();
const mongoose = require("mongoose");

/**     *       *       *       *       *       *      *    **
 *  *       *       *   Database Connection    *       *     *
 *      *   Setup inputs for connect function                *
 **     *       *       *       *       *       *      *    **
 */
const MONGO_URI = process.env.MONGO_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish connection
mongoose.connect(MONGO_URI, CONFIG);

// Events for when connection when opened/disconnected/error
mongoose.connection
  .on("open", () => console.log("connected to mongo"))
  .on("close", () => console.log("disconnected from mongoose"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
