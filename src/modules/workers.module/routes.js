const express = require("express");

const router = express.Router();
const { getAllWorkers, getWorkerById } = require("./workers.controller");

router.get("/", async (req, res) => {

  await getAllWorkers(req, res);
});

router.get("/:worker_id", async (req, res) => {

  await getWorkerById(req, res);
})
module.exports = router;
