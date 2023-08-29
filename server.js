/**     *       *       *       *       *       *      *    **
 *  *       *   Import Our Dependencies    *       *      *  *
 **     *       *       *       *       *       *      *    **
 */
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path"); // built in node module we use to resolve paths more on this when we use it
const Flight = require("./models/Flight");

/**     *       *       *       *       *       *       *      **
 *  *       *   Create Express Application Object    *       *  *
 **     *       *       *       *       *       *       *      **
 */
const app = express();
app.set("view engine", "pug"); //setting view engine to pug instead of jsx

/**     *       *       *       *       *       *       *      **
 *  *       *       *      *    Middleware    *     *       *   *
 **     *       *       *       *       *       *       *      **
 */
app.use(morgan("tiny")); // logging
// override for put and delete requests from forms
app.use(methodOverride("_method"));
// parses data sent in the body to make it usable in our app
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // serves files from public statically

/**     *       *       *       *       *       *       *      **
 *  *       *       *      *    Routes      *       *       *   *
 **     *       *       *       *       *       *       *      **
 */

app.get("/", (req, res) => {
  res.send("your server is running... better catch it!");
});

app.use("/flights", require("./controllers/flights"));

/**     *       *       *       *       *       *      *    **
 *  *       *       *    Server Listener    *       *        *
 **     *       *       *       *       *       *      *    **
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
