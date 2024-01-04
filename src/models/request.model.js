const { DataTypes } = require("sequelize");
const {sequelize} = require("../sequilize.db.js");
const User = require("./user.model.js");
const Worker = require("./worker.model.js");

const Requests = sequelize.define(
  "requests",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50000),
      allowNull: false,
    },
    worker_id: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "requests",
  },
);

User.hasMany(Requests, {
  foreignKey: "user_id",
});

Requests.belongsTo(Worker, {
  foreignKey: "worker_id",
  allowNull: false,
});
Worker.hasMany(Requests, {
  foreignKey: "worker_id",
});

module.exports = Requests;
