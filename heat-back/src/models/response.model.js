const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Candidate = require("./candidate.model");

const Response = sequelize.define(
  "Response",
  {
    responseQ1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseQ2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseQ3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseAudio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Candidate,
        key: "uuid",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    responseAi: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Response;
