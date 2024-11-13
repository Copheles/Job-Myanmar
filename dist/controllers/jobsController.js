var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Job from "../models/Job.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkPermissions } from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position, company, jobLocation, jobDescription, aboutCompany, jobType } = req.body;
    if (!position ||
        !company ||
        !jobLocation ||
        !jobDescription ||
        !jobType ||
        !aboutCompany) {
        throw new BadRequestError("Please provide all values");
    }
    req.body.createdBy = req.user.userId;
    const job = yield Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
});
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, jobType, sort, search } = req.query;
    const queryObject = {};
    // add stuff based on condition
    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }
    if (search) {
        queryObject.position = {
            $regex: search,
            $options: "i",
        };
    }
    // No await
    let result = Job.find(queryObject);
    if (sort === "latest") {
        result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    if (sort === "a-z") {
        result = result.sort("position");
    }
    if (sort === "z-a") {
        result = result.sort("-position");
    }
    if (!sort || sort === 'all') {
        result = result.sort("-createdAt");
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    // chain sort conditions
    const jobs = yield result;
    const totalJobs = yield Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);
    console.log(totalJobs);
    res.status(StatusCodes.OK).json({
        totalJobs,
        jobs,
        numOfPages,
    });
});
const getSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: jobId } = req.params;
    const job = yield Job.findOne({
        _id: jobId,
    }).populate("comments");
    if (!job) {
        throw new NotFoundError(`No job with id:${jobId}`);
    }
    res.status(StatusCodes.OK).json({
        job,
        comments: job.comments,
    });
});
const getRelatedJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: jobId } = req.params;
    const job = yield Job.findById(jobId);
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`);
    }
    const position = job.position;
    // find job with related postion by exclude
    const jobs = yield Job.find({
        position: {
            $regex: position,
            $options: "i",
        },
        _id: {
            $ne: jobId,
        },
    });
    res.status(StatusCodes.OK).json({
        count: jobs.length,
        jobs,
    });
});
const getJobsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield User.findById(userId);
    if (!user) {
        throw new NotFoundError(`No user with id: ${userId}`);
    }
    const jobs = yield Job.find({
        createdBy: userId,
    });
    res.status(StatusCodes.OK).json({
        count: jobs.length,
        jobs,
    });
});
const showStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let stats = yield Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: "$status", // to group on specific value eg. _id: '$jobLocaton"
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };
    let monthlyApplication = yield Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt",
                    },
                    month: {
                        $month: "$createdAt",
                    },
                },
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id.year": -1,
                "_id.month": -1,
            },
        },
        {
            $limit: 6,
        },
    ]);
    monthlyApplication = monthlyApplication
        .map((item) => {
        const { _id: { year, month }, count, } = item;
        const date = moment()
            .month(month - 1)
            .year(year)
            .format("MMM Y");
        return {
            date,
            count,
        };
    })
        .reverse();
    res.status(StatusCodes.OK).json({
        defaultStats,
        monthlyApplication,
    });
});
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: jobId } = req.params;
    const { company, position, jobLocation, jobDescription, aboutCompany } = req.body;
    if (!position ||
        !company ||
        !jobLocation ||
        !jobDescription ||
        !aboutCompany) {
        throw new BadRequestError("Please provide all values");
    }
    const job = yield Job.findOne({
        _id: jobId,
    });
    if (!job) {
        throw new NotFoundError(`No job with id : ${jobId}`);
    }
    // check permissions
    console.log(typeof req.user.userId);
    console.log(typeof job.createdBy);
    checkPermissions(req.user, job.createdBy);
    const updatedJob = yield Job.findOneAndUpdate({
        _id: jobId,
    }, req.body, {
        new: true,
        runValidators: true,
    });
    // job.position = position;
    // job.company = company
    // await job.save()
    res.status(StatusCodes.OK).json({
        updatedJob,
    });
});
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: jobId } = req.params;
    const job = yield Job.findOne({
        _id: jobId,
    });
    if (!job) {
        throw new NotFoundError(`No job with id : ${jobId}`);
    }
    checkPermissions(req.user, job.createdBy);
    yield job.remove();
    res.status(StatusCodes.OK).json({
        message: `Success! job removed`,
    });
});
export { createJob, deleteJob, getAllJobs, updateJob, getSingleJob, getRelatedJobs, showStats, getJobsByUser, };
