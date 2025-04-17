import Application from "../models/applicationSchema.js";
import Job from "../models/jobSchema.js";

export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({
      jobId: job._id,
      applicantId: req.user._id,
    });
    if (alreadyApplied) return res.status(400).json({ message: "Already applied to this job" });

    const newApp = await Application.create({
      jobId: job._id,
      applicantId: req.user._id,
      resume: req.user.resume || "",
      coverLetter: req.body.coverLetter || ""
    });
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id }).populate("jobId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applicants = await Application.find({ jobId: req.params.id }).populate("applicantId", "name email resume");
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};