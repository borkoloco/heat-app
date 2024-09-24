const express = require("express");
const candidateController = require("../controllers/candidate.controller");
const authenticateToken = require("../middleware/auth");
const { sendTestLinkEmail } = require("../services/email.service");

const router = express.Router();

router.post("/", authenticateToken, candidateController.createCandidate);
// router.get(
//   "/user/:user",
//   authenticateToken,
//   candidateController.getCandidatesByUser
// );
// Ruta para obtener los estudiantes asociados al user
router.get("/", authenticateToken, candidateController.getCandidatesByUser);

router.post("/send-link", async (req, res) => {
  const { email, testLink } = req.body;

  try {
    await sendTestLinkEmail(email, testLink);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
});

module.exports = router;
