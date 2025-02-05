const express = require('express');
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// get all items from database
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});