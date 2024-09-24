const candidateService = require("../services/candidate.service");
const { sendTestLinkEmail } = require("../services/email.service");

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
  const userId = req.user.id;
  try {
    const candidates = await candidateService.getCandidatesByUser(userId);
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener candidatos" });
  }
};

const sendTestLink = async (req, res) => {
  const { email, testLink } = req.body;
  try {
    await sendTestLinkEmail(email, testLink);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

module.exports = {
  sendTestLink,
  createCandidate,
  getCandidatesByUser,
};
