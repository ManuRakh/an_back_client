const workerModel = require("../../models/worker.model");
const { Op } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();
const getAllWorkers = async (query) => {
  const { user_id: userId, all } = query;

  let searchRequest = {};
  
  if (userId && all !== "true") {
    searchRequest = {
    where: {
      user_id: {
      [Op.eq]: userId,
      }
    }
  }
  const foundDoctors =await  workerModel.findOne(searchRequest);

  return [foundDoctors];
} else {
  const foundDoctors = await workerModel.findAll(searchRequest);
  return foundDoctors.map((doctor) => doctor.toJSON());

}

    return foundDoctors;
}   

const getWorkerById = async (workerId) => {
    const foundWorker = await workerModel.findOne({
        where :{
          id: {
            [Op.eq]: workerId
          }
        }
      });
    
      return foundWorker ? foundWorker.get() : null; 
}

const createWorker = async (params) => {
    params.academyName = process.env.academyName;

    const createdWorker = await workerModel.create({...params}, { returning: true });

    return createdWorker;
}

const deleteWorker = async (workerId) => {
    console.log({workerId})
    return workerModel.destroy({
        where :{
            id: {
              [Op.eq]: workerId
            }
          }
        }, { returning: true });
};

module.exports =  {
    getAllWorkers,
    getWorkerById,
    createWorker,
    deleteWorker,
}