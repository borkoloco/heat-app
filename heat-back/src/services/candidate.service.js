const Candidate = require("../models/candidate.model");

const createCandidate = async (data) => {
  return await Candidate.create(data);
};

const getCandidatesByUser = async (userId) => {
  return await Candidate.findAll({ where: { userId } });
};

module.exports = {
  createCandidate,
  getCandidatesByUser,
};
