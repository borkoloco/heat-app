const express = require("express");
const candidateController = require("../controllers/candidate.controller");

const router = express.Router();

router.post("/", candidateController.createCandidate);
router.get("/", candidateController.getCandidates);

module.exports = router;
