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

  console.log("Request created");

  return request ? request.get() : null; 
};

const updateRequest = async (params, id) => {
  const updatedRequest = await requestModel.update({
    ...params,
  }, {
      where :{
        id: {
          [Op.eq]: id
        }
      }
  }, {
    returning: true,
  });

  console.log("Request updated");

  return updatedRequest;
}

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

const fetchIncomingRequests = async () => {
  const foundRequest = await requestModel.findAll({
    where :{
      receiving_academy: {
        [Op.eq]: "math"
      }
    }
  });

  return foundRequest.map((request) => request.toJSON());
}

const fetchOutcomingRequests = async () => {
  const foundRequest = await requestModel.findAll({
    where :{
      sender_academy: {
        [Op.eq]: "math"
      }
    }
  });

  return foundRequest.map((request) => request.toJSON());
}

const getRequest = async (id) => {
  const foundRequest = await requestModel.findOne({
    where :{
      id: {
        [Op.eq]: id
      }
    }
  });

  return foundRequest ? foundRequest.get() : null;

}
module.exports = {
  createRequest,
  fetchRequestByWorker,
  fetchIncomingRequests,
  updateRequest,
  getRequest,
  fetchOutcomingRequests,
};
