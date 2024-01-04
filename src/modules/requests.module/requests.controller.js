const requestsService = require("./requests.service");

const createRequest = async (req, res) => {
  try {
    const { body } = req;

    const request = await requestsService.createRequest(body);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
};

const fetchRequestByWorker = async (req, res) => {
  try {
    const { params } = req;
    const { worker_id: workerId } = params;

    const request = await requestsService.fetchRequestByWorker(workerId);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }

}

module.exports = {
  createRequest,
  fetchRequestByWorker,
};
