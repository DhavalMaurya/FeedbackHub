const express = require("express");
const { submitFeedback, getAllFeedback ,getFeedbackSummary } = require("../controller/Feedback");
const { auth } = require("../middlewares/Auth");
const { isAdmin } = require("../middlewares/Role");

const feedbackRoutes = express.Router();

feedbackRoutes.post("/submit" ,auth, submitFeedback)
feedbackRoutes.get("/getAllFeedback" , getAllFeedback)
feedbackRoutes.get("/getFeedbackSummary" , getFeedbackSummary )

module.exports = feedbackRoutes