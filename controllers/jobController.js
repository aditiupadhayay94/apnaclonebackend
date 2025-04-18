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
    const newJob = new Job({
      title,
      company,
      location,
      description,
      salary,
      jobType,
      postedBy: req.user._id,
    });

    await newJob.save();
    res.status(201).json({ message: "Job Created", newJob });
  } catch (err) {
    res.status(500).json({ message: `${err} -  Server error` });
  }
};

export const updateJob = async (req, res) => {
  try {
    let { id } = req.params;
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    // if (job.postedBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    const updated = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Job Updated", job: updated });
  } catch (err) {
    res.status(500).json({ message: `${err}-server error` });
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
