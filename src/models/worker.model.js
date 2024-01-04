const { DataTypes } = require("sequelize");
const {sequelize} = require("../sequilize.db");

const Worker = sequelize.define(
  "worker",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },    
    spec: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    academyName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "worker",
  },
);

module.exports = Worker;
