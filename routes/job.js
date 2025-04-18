import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;