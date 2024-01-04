const workerModel = require("../../models/worker.model");

const getAllWorkers = async () => {
    const foundDoctors = await workerModel.findAll({
        where: {
        }
      });
    return foundDoctors.map((doctor) => doctor.toJSON());
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
module.exports =  {
    getAllWorkers,
    getWorkerById,
}