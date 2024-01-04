const { Op } = require("sequelize");

const workerModel = require("../../models/worker.model");
const requestModel = require("../../models/request.model");

const createRequest = async (params) => {
  const request = await requestModel.create({
    ...params,
    status: "scheduled",
  }, {
    returning: true,
  });

  return request ? request.get() : null; 
};

const fetchRequestByWorker = async (workerId) => {
  const foundRequest = await requestModel.findOne({
    where :{
      worker_id: {
        [Op.eq]: workerId
      }
    }
  });

  return foundRequest ? foundRequest.get() : null;
}


module.exports = {
  createRequest,
  fetchRequestByWorker,
};
