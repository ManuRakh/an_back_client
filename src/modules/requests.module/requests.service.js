const { Op } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const workerModel = require("../../models/worker.model");
const requestModel = require("../../models/request.model");

const createRequest = async (params) => {
  const request = await requestModel.create({
    ...params,
    status: "scheduled",
  }, {
    returning: true,
  });

  console.log(params);

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

const fetchIncomingRequests = async (query) => {
  const { user_id, isAdmin } = query;

  if (!user_id) throw new Error(`User ${user_id} does not exist`);

  let searchRequest = {};
  if (isAdmin == "true") {
    searchRequest = {
    where : {
      receiving_academy: {
        [Op.eq]: process.env.current_academy
      }
    }
  }
  }
  else searchRequest = {
    where : {
      receiving_academy: {
        [Op.eq]: process.env.current_academy
      },
      receiver_user_id: {
        [Op.eq]: user_id,
      }
    }
  };

  const foundRequest = await requestModel.findAll(searchRequest);

  return foundRequest.map((request) => request.toJSON());
}

const fetchOutcomingRequests = async (query) => {
  const { user_id, isAdmin } = query;

  if (!user_id) throw new Error(`User ${user_id} does not exist`);

  
  let searchRequest = {};

  if (isAdmin == "true") {searchRequest = {
    where : {
      sender_academy: {
        [Op.eq]: process.env.current_academy
      }
    }
  }} else {
    searchRequest = {
    where : {
      sender_academy: {
        [Op.eq]: process.env.current_academy
      },
      user_id: {
        [Op.eq]: user_id,
      }
    }
  }
  };

  
  const foundRequest = await requestModel.findAll(searchRequest);

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
