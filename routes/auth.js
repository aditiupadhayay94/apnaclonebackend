import express from "express";
import {getCurrentUser, registerUser, loginUser } from "../controllers/authControllers.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// protected
router.get('/me', protect, getCurrentUser);

export default router;
