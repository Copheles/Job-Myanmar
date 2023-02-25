import Job from "../models/Job.js"
import User from "../models/User.js";
import {
  StatusCodes
} from "http-status-codes"
import {
  BadRequestError,
  NotFoundError,
} from "../errors/index.js";
import { checkPermissions } from "../utils/checkPermissions.js";


const createJob = async (req, res) => {
  const {
    position,
    company,
    jobLocation,
    jobDescription,
    aboutCompany
  } = req.body;

  if (!position || !company || !jobLocation || !jobDescription || !aboutCompany) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json(job)

}

const getAllJobs = async (req, res) => {
  const {
    status,
    jobType,
    sort,
    search
  } = req.query

  const queryObject = {

  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = {
      $regex: search,
      $options: 'i'
    }
  }

  // No await
  let result = Job.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit)

  // chain sort conditions
  const jobs = await result
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  res.status(StatusCodes.OK).json({
    totalJobs,
    jobs,
    numOfPages
  })
}

const getSingleJob = async (req, res) => {
  const {
    id: jobId
  } = req.params;

  const job = await Job.findOne({
    _id: jobId
  }).populate('comments')
  if (!job) {
    throw new NotFoundError(`No job with id:${jobId}`)
  }

  console.log(job.comments)
  res.status(StatusCodes.OK).json({
    job,
    comments: job.comments
  })
}

const getRelatedJobs = async (req, res) => {
  const {
    id: jobId
  } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  const position = job.position;

  // find job with related postion by exclude 
  const jobs = await Job.find({
    'position': {
      '$regex': position,
      $options: 'i'
    },
    '_id': {
      '$ne': jobId
    }
  })

  res.status(StatusCodes.OK).json({
    count: jobs.length,
    jobs
  })
}

const getJobsByUser = async (req, res) => {
  const {
    userId
  } = req.params
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`No user with id: ${userId}`)
  }
  const jobs = await Job.find({
    createdBy: userId
  });

  res.status(StatusCodes.OK).json({
    count: jobs.length,
    jobs
  })
}

const updateJob = async (req, res) => {
  const {
    id: jobId
  } = req.params;
  const {
    company,
    position,
    jobLocation,
    jobDescription,
    aboutCompany
  } = req.body;

  if (!position || !company || !jobLocation || !jobDescription || !aboutCompany) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({
    _id: jobId
  })

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`)
  }

  // check permissions

  console.log(typeof req.user.userId);
  console.log(typeof job.createdBy)

  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({
    _id: jobId
  }, req.body, {
    new: true,
    runValidators: true
  })
  // job.position = position;
  // job.company = company

  // await job.save()

  res.status(StatusCodes.OK).json({
    updatedJob
  })
}

const deleteJob = async (req, res) => {
  const {
    id: jobId
  } = req.params

  const job = await Job.findOne({
    _id: jobId
  })

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)


  await job.remove()

  res.status(StatusCodes.OK).json({
    message: `Success! job removed`
  })
}



export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getSingleJob,
  getRelatedJobs,
  getJobsByUser
}