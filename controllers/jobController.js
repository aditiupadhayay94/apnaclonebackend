import Job from "../models/jobSchema.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).send(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).send(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createJob = async (req, res) => {
  if (req.user.role !== "employer")
    return res.status(403).json({ message: "Only employers can post jobs" });

  const { title, company, location, description, salary, jobType } = req.body;

  try {
    const newJob = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      jobType,
      postedBy: req.user._id,
    });
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    // if (job.postedBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    const delJobs = await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted", job: delJobs });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
