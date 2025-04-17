import express from "express";
import {
  applyToJob,
  getUserApplications,
  getApplicantsForJob
} from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/jobs/:id/apply", protect, applyToJob);
router.get("/user/applications", protect, getUserApplications);
router.get("/employer/jobs/:id/applicants", protect, getApplicantsForJob);

export default router;