import express from "express";
const router = express.Router();
import { createJob, deleteJob, getAllJobs, updateJob, getSingleJob, getRelatedJobs, getJobsByUser, showStats } from '../controllers/jobsController.js';
router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob).get(getSingleJob);
router.route('/:id/relatedJobs').get(getRelatedJobs);
router.route('/createdBy/:userId').get(getJobsByUser);
export default router;
