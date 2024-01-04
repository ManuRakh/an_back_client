const workersService = require("./workers.service");

const getAllWorkers = async (req,res) => {
    try {
        const allWorkers = await workersService.getAllWorkers();
    
        res.jsonp({
          error: "",
          data: { allWorkers },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const getWorkerById = async (req,res) => {
  try {
    const { worker_id: workerId } = params;

    const foundWorker = await workersService.getWorkerById(workerId);

    res.jsonp({
      error: "",
      data: { foundWorker },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}

module.exports = {
  getAllWorkers,
  getWorkerById,
}