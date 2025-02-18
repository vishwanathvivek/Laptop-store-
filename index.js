/**
 * 1. IMPORTS
 * import essential modules initially.
 */

global.data = require('./data-module');
const cors = require('cors');
const express = require("express");
const app = express();
require("./src/db");
const productRoute = require("./src/routes/products");
const usersRoute = require("./src/routes/users");
const cartRoute = require("./src/routes/cart");
const orderRoute = require("./src/routes/orders");
const path = require("path");


/**
 * 2. MIDDLEWARES
 * Essential configs for the imported modules, CORS
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Header", "*");
//   next();
// });
app.use(cors({
  origin: '*'
}));

/**
 * 3. ROUTES
 */
app.use("/api/product", productRoute);
app.use("/api/user", usersRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
//   });
// }


require("./src/initial-insert");


// listen to the port
app.listen(process.env.PORT || 3000);
