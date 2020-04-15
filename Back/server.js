const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/db");
const router1=require("./routes/routes")
const {
    port
} = require("./config");
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use("/api/database", router);
app.use("/api",router1);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});