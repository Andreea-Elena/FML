const express = require("express");
const router = express.Router();
const 
    db = require("../controllers/db");

router.get("/reset", db.reset);

module.exports = router;