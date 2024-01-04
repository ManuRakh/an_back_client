const express = require("express");

const router = express.Router();
const { getAllUsers } = require("./users.controller");

router.get("/", async (req, res) => {
  await getAllUsers(req, res);
});

module.exports = router;
