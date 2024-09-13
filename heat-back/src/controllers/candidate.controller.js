const candidateService = require("../services/candidate.service");

const createCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.createCandidate(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el candidato" });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await candidateService.getCandidates();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener candidatos" });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
};
