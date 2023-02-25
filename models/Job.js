import mongoose from "mongoose";
import { Populate } from "../utils/autopopulate.js";

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company'],
    maxlength: 20,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'internship'],
    default: 'full-time',
  },
  jobLocation: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
  },
  aboutCompany: {
    type: String,
  },
  numOfComments: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {
  timestamps: true
})

JobSchema.virtual('comments', {
  ref: "Comment",
  localField: '_id',
  foreignField: 'job',
  justOne: false
})


async function deleteAllComments (next) {
  await this.model('Comment').deleteMany({
    job: this._id
  })
  next()
}

async function deleteReplies(next){
  const comments = await this.model('Comment').find({ job: this._id});
  for(let i= 0; i< comments.length; i++){
    await comments[i].remove()
  }
}

JobSchema.pre('find', Populate('createdBy'))

// JobSchema.pre('remove', deleteAllComments)
JobSchema.pre('remove', deleteReplies)

export default mongoose.model('Job', JobSchema)