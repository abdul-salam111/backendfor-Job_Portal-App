const Job = require("../models/job");

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);
        try {
            const savedJob = await newJob.save();
            const { __v, createdAt, updateAt, ...newJobInfo } = savedJob._doc;
            res.status(200).json(newJobInfo);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    updateJob: async (req, res) => {

        try {
            const updateJob = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const { __v, createdAt, updatedAt, ...updateJobInfo } = updateJob._doc;
            res.status(200).json({ ...updateJobInfo });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id);
            res.status(200).json("Job Deleted!");

        } catch (error) {
            res.status(403).json({ "status": "Faild to delete Job", "message": error.message })
        }
    },
    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            const { password, __v, createdAt, ...jobData } = job._doc;
            res.status(200).json(jobData);

        } catch (error) {
            res.status(403).json({ "status": "Faild to get the users", "message": error.message })
        }
    },

    getAllJobs: async (req, res) => {
        try {
            const allJobs = await Job.find();
            res.status(200).json(allJobs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "message": "Internal server error" });
        }
    },
    searchJobs: async (req, res) => {
        try {
            const results = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobSearch",
                        text: {
                          query:req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "message": "Internal server error" });
        }
    }


}