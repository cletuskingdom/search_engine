const express = require("express");
const router = express.Router();
const homeController = require("./../controllers/homeController");

// Welcome route
router.get("/", homeController.index);

router.get("/search", homeController.search);
router.post("/search", homeController.search);

module.exports = router;
