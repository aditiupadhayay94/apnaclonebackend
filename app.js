import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Storing data 
import Job from "./models/jobSchema.js";
import { jobs } from "./data/jobData.js";
import User from "./models/userSchema.js";
import { users } from "./data/userData.js";
import Application from "./models/applicationSchema.js";
import { applications } from "./data/applicationData.js";
// Import routes
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";

// Config
import 'dotenv/config'
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", applicationRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.get("/addJobs",async (req,res)=>{
  // await Job.deleteMany({})
//   let data = await Job.insertMany(jobs);
//   console.log(data);
//   res.send("Done!")
// });

app.get("/addUsers",async(req,res)=>{
  await User.deleteMany({})
  let data = await User.insertMany(users);
  console.log(data)
  res.send("Added Users!")
})

app.get("/addApplications",async(req,res)=>{
  await Application.deleteMany({})
   let data = Application.insertMany(applications)
   console.log(data)
   res.send("Added Applications!")
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
