const express = require("express");

const router = express.Router();
const { getAllUsers, update, getUser, create } = require("./users.controller");

router.get("/", async (req, res) => {
  await getAllUsers(req, res);
});

router.patch("/:id", async (req, res) => {
  await update(req, res);
});

router.get("/:id", async (req, res) => {
  await getUser(req, res);
});

router.post("/", async (req, res) => {
  await create(req, res);
})

module.exports = router;
