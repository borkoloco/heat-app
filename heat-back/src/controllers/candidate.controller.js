const candidateService = require("../services/candidate.service");

const createCandidate = async (req, res) => {
  try {
    console.log("Decoded user in request:", req.user);
    const { firstName, lastName, email } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const candidate = await candidateService.createCandidate({
      firstName,
      lastName,
      email,
      userId,
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el candidato" });
  }
};

const getCandidatesByUser = async (req, res) => {
  try {
    const candidates = await candidateService.getCandidatesByUser(
      req.params.userId
    );
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener candidatos" });
  }
};

module.exports = {
  createCandidate,
  getCandidatesByUser,
};
