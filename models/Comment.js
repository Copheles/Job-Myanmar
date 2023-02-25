import mongoose from "mongoose"
import {
  Populate
} from '../utils/autopopulate.js';

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: [true, 'Please provide comment content']
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  author: {
    type: String
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})

CommentSchema.statics.calculateNumOfCmt = async function (jobId) {
  const results = await this.aggregate([{
      $match: {
        job: jobId
      }
    },
    {
      $group: {
        _id: null,
        numOfComments: {
          $sum: 1
        }
      }
    }
  ])

  try {
    await this.model('Job').findOneAndUpdate({
      _id: jobId
    }, {
      numOfComments: results[0]?.numOfComments || 0
    })
  } catch (error) {
    console.log(error)
  }
}

CommentSchema.pre('findOne', Populate('replies')).pre('find', Populate('replies'))

CommentSchema.pre('remove', async function (next) {
  const comment = this;
  const children = await this.constructor.find({
    parentId: comment._id
  })

  // Delete all children comments recursively
  const deleteChildren = async (children) => {
    for (let child of children) {
      console.log("inside")
      const grandChildren = await this.constructor.find({

        parentId: child._id
      })
      if (grandChildren.length) {
        await deleteChildren(grandChildren);
      }

      await this.constructor.findByIdAndDelete(child._id);
    }


  }
  await deleteChildren(children);
  next()
})

CommentSchema.pre('validate', async function (next) {
  const count = await this.constructor.countDocuments();
  if (count > 50) {
    await this.constructor.deleteMany({})
  }
  next()
})

CommentSchema.post('save', async function () {
  await this.constructor.calculateNumOfCmt(this.job)
})



CommentSchema.post('remove', async function () {
  await this.constructor.calculateNumOfCmt(this.job)
})



export default mongoose.model('Comment', CommentSchema)