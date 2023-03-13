import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createJob,
  deleteComment,
  deleteJob,
  getAllJobs,
  getJobsByUser,
  getRelatedJobs,
  getSingleJob,
  getStats,
  updateComment,
} from "./jobThunks";

const initialState = {
  jobs: [],
  singleJob: {
    job: {
      _id: "",
      company: "",
      position: "",
      jobLocation: "",
      status: "",
      jobDescription: "",
      aboutCompany: "",
    },
    comments: [],
  },
  stats: {},
  monthlyApplication: [],
  jobsBySingleUser: [],
  relatedJobs: [],
  isJobEditing: false,
  EditJobId: null,
  isLoading: false,
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchText: "", // for fix bug
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  status: "pending",
  statusOptions: ["interview", "declined", "pending"],
  jobType: "full-time",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  position: "",
  company: "",
  jobLocation: "",
  jobDescription: "",
  aboutCompany: "",
  showJobAlert: false,
  alertDetails: {},
  isCommentLoading: false,
  postCommentData: null,
  updateCommentData: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChangeInputJob: (state, { payload }) => {
      const { name, value } = payload;
      state.page = 1;
      state[name] = value;
    },
    clearComments: (state) => {
      state.singleJob.comments = [];
    },
    postCommentSocket: (state, { payload }) => {
      state.isCommentLoading = false;
      const parentId = payload[0].parentId;
      const comments = state.singleJob.comments;

      if (!parentId) {
        const isTrue = comments.some((comment) => {
          console.log(typeof comment._id);
          return comment._id === payload[0]._id;
        });
        if (!isTrue) {
          if (state.singleJob.job._id === payload[1]) {
            comments.push(payload[0]);
          }
        }
      } else {
        const findParendComment = (cmts) => {
          for (let i = 0; i < cmts.length; i++) {
            const comment = cmts[i];
            if (comment._id === parentId) {
              const isTrue = comment.replies.some((cmt) => {
                return cmt._id === payload[0]._id;
              });
              if (!isTrue) {
                comment.replies.push(payload[0]);
                break;
              }
            } else {
              findParendComment(comment.replies);
            }
          }
        };
        findParendComment(comments);
      }
      state.postCommentData = null;
    },
    deleteCommentSocket: (state, { payload }) => {
      state.isCommentLoading = false;
      const comments = state.singleJob.comments;

      const findComments = (comments) => {
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          if (comment._id === payload) {
            comments.splice(i, 1);
            break;
          } else {
            findComments(comment.replies);
          }
        }
      };

      findComments(comments);
    },
    updateCommentSocket: (state, { payload }) => {
      state.isCommentLoading = false;
      const comments = state.singleJob.comments;
      const findComments = (comments) => {
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          if (comment._id === payload._id) {
            Object.assign(comment, payload);
            break;
          } else {
            findComments(comment.replies);
          }
        }
      };
      findComments(comments);
      state.updateCommentData = null;
    },
    handleChangeFilterInput: (state, { payload }) => {
      const { name, value } = payload;
      state.page = 1;
      state[name] = value;
    },
    searching: (state, { payload }) => {
      state.searchText = payload;
    },
    clearFilter: (state) => {
      state.search = "";
      state.searchStatus = "all";
      state.searchType = "all";
      state.sort = "latest";
    },
    changeJobDescription: (state, { payload }) => {
      state.jobDescription = payload;
      state.page = 1;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    editingJob: (state, { payload }) => {
      const job = payload;
      const {
        _id,
        position,
        company,
        status,
        jobLocation,
        jobType,
        jobDescription,
        aboutCompany,
      } = job;
      state.isJobEditing = true;
      state.EditJobId = _id;
      state.position = position;
      state.company = company;
      state.jobLocation = jobLocation;
      state.jobType = jobType;
      state.status = status;
      state.jobDescription = jobDescription;
      state.aboutCompany = aboutCompany;
    },

    clearJobInputFields: (state) => {
      state.jobDescription = "";
      state.page = 1;
      state.position = "";
      state.company = "";
      state.jobLocation = "";
      state.status = "pending";
      state.jobType = "full-time";
      state.aboutCompany = "";
    },
    setFalseToJobEditingAndJobIdToNull: (state) => {
      state.EditJobId = null;
      state.isJobEditing = false;
    },
    clearSingleJob: (state) => {
      state.singleJob = {
        _id: "",
        company: "",
        position: "",
        jobLocation: "",
        status: "",
        jobDescription: "",
        aboutCompany: "",
      };
    },
  },
  extraReducers(builder) {
    // create job
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs.push(payload);
    });
    builder.addCase(createJob.rejected, (state) => {
      state.isLoading = false;
    });

    // all jobs
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.totalJobs = payload.totalJobs;
      state.numOfPages = payload.numOfPages;
    });
    builder.addCase(getAllJobs.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    // get job
    builder.addCase(getSingleJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleJob.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.singleJob = payload;
    });
    builder.addCase(getSingleJob.rejected, (state) => {
      state.isLoading = false;
    });

    // get related Jobs
    builder.addCase(getRelatedJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedJobs.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.relatedJobs = payload.jobs;
    });
    builder.addCase(getRelatedJobs.rejected, (state) => {
      state.isLoading = false;
    });

    // get jobs by user

    builder.addCase(getJobsByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobsByUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobsBySingleUser = payload.jobs;
    });
    builder.addCase(getJobsByUser.rejected, (state) => {
      state.isLoading = false;
    });

    // delete Job
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const jobs = state.jobs;
      const index = jobs.findIndex((job) => payload === job._id);
      jobs.splice(index, 1);
    });
    builder.addCase(deleteJob.rejected, (state) => {
      state.isLoading = false;
    });

    // get stats

    builder.addCase(getStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStats.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplication = payload.monthlyApplication;
    });
    builder.addCase(getStats.rejected, (state) => {
      state.isLoading = false;
    });

    // create comment
    builder.addCase(createComment.pending, (state) => {
      state.isCommentLoading = true;
    });

    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.isCommentLoading = false;
      state.postCommentData = payload.comment;
      const parentId = payload.comment.parentId;
      const comments = state.singleJob.comments;

      if (!parentId) {
        comments.push(payload.comment);
      } else {
        const findParendComment = (cmts) => {
          for (let i = 0; i < cmts.length; i++) {
            const comment = cmts[i];
            if (comment._id === parentId) {
              comment.replies.push(payload.comment);
              break;
            } else {
              findParendComment(comment.replies);
            }
          }
        };
        findParendComment(comments);
      }
    });

    builder.addCase(createComment.rejected, (state) => {
      state.isCommentLoading = false;
    });

    // delete comment

    builder.addCase(deleteComment.pending, (state) => {
      state.isCommentLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.isCommentLoading = false;
      const comments = state.singleJob.comments;

      const findComments = (comments) => {
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          if (comment._id === payload) {
            comments.splice(i, 1);
            break;
          } else {
            findComments(comment.replies);
          }
        }
      };

      findComments(comments);
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.isCommentLoading = false;
    });

    // updateComment
    builder.addCase(updateComment.pending, (state) => {
      state.isCommentLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, { payload }) => {
      state.isCommentLoading = false;
      state.updateCommentData = payload.comment;
      const comments = state.singleJob.comments;
      const findComments = (comments) => {
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          if (comment._id === payload.comment._id) {
            Object.assign(comment, payload.comment);
            break;
          } else {
            findComments(comment.replies);
          }
        }
      };
      findComments(comments);
    });
    builder.addCase(updateComment.rejected, (state) => {
      state.isCommentLoading = false;
    });
  },
});

export const {
  handleChangeInputJob,
  changeJobDescription,
  clearJobInputFields,
  clearSingleJob,
  editingJob,
  setFalseToJobEditingAndJobIdToNull,
  clearComments,
  changePage,
  clearFilter,
  handleChangeFilterInput,
  searching,
  postCommentSocket,
  deleteCommentSocket,
  updateCommentSocket,
} = jobSlice.actions;

export default jobSlice.reducer;
