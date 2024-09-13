const Candidate = require("../models/candidate.model");

const createCandidate = async (data) => {
  return await Candidate.create(data);
};

const getCandidates = async () => {
  return await Candidate.findAll();
};

const getCandidateById = async (id) => {
  return await Candidate.findByPk(id);
};

module.exports = {
  createCandidate,
  getCandidates,
  getCandidateById,
};
