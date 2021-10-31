const express = require("express");
const router = express.Router();
const controller = require("../controller/message_controller");

router.post("/message", controller.createMessage);

module.exports = router;
