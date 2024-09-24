const express = require("express");
const candidateController = require("../controllers/candidate.controller");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, candidateController.createCandidate);
router.get(
  "/user/:user",
  authenticateToken,
  candidateController.getCandidatesByUser
);

module.exports = router;
