const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
// Router Imports
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Convert All Req's Recieved To JSON
app.use(express.json({ limit: "10kb" }));

// External Package -> Used For Accessing config.env
dotenv.config({ path: "./config.env" });
// Extracting Database URL From config.env
const DB = process.env.DATABASE;

// External Package -> For Using MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connection Successful!"));

app.use("/v1/users", userRoutes);
app.use("/v1/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Cyber Notes Backend Running On  port:${port}`);
});
