const path = require("path");
const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const connectionDB = require("./config/db");


//Connect to DB
// connectionDB(); 

// Route Files
const inventory = require("./routes/inventory");
const inventoryType = require("./routes/inventoryType");
const warehouse = require("./routes/warehouse");
const user = require("./routes/user");
const inventoryProduct = require("./routes/inventoryProduct");
const inventoryDetail = require("./routes/inventoryDetail");
const inventoryCodebar = require("./routes/inventoryCodebars");
const codeBars = require("./routes/codeBars");
const invoice = require("./routes/invoice");

//Initailize Express
const app = express();

//Enable Body Parser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Enable Loggin Middleware
app.use(morgan('combined'));

//Enable CORS
app.use(cors());

//Mount Routers
app.use("/api/inventory", inventory);
app.use("/api/inventoryType", inventoryType);
app.use("/api/warehouse", warehouse);
app.use("/api/user", user);
app.use("/api/inventoryProduct", inventoryProduct);
app.use("/api/inventoryDetail", inventoryDetail);
app.use("/api/inventoryCodebar", inventoryCodebar);
app.use("/api/codeBar", codeBars);
app.use("/api/invoice", invoice);

const PORT = process.env.PORT || 5005;

const server = app.listen(
    PORT,
    console.log(
      `Server running on PORT ${process.env.PORT}`.yellow.bold
    ),
    (err) => console.log(err)
  );

  //Handle Unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close Server & exit process
    server.close(() => process.exit(1));
  });
  