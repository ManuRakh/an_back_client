const { DataTypes } = require("sequelize");
const {sequelize} = require("../sequilize.db");
const User = require("./user.model");
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "worker",
  },
);

Worker.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasOne(Worker, {
  foreignKey: 'user_id',
  as: 'worker',
});


module.exports = Worker;
