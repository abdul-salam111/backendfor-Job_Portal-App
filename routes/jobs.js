const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAdmin } = require("../middlewares/verifytoken");

// Router for posting Jobs
router.post("/createJob", verifyAndAdmin, jobController.createJob);

// Router for updating Jobs
router.put("/updateJob/:id", verifyAndAdmin, jobController.updateJob);

// Router for deleting Jobs
router.delete("/deleteJob/:id", verifyAndAdmin, jobController.deleteJob);

// Router for getting a Job
router.get("/getJob/:id", verifyAndAdmin, jobController.getJob);

// Router for getting all Jobs
router.get("/getAllJobs", verifyAndAdmin, jobController.getAllJobs);

// Router for searching Jobs
router.get("/search/:key", verifyAndAdmin, jobController.searchJobs);

module.exports = router;
