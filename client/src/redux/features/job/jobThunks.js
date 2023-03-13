import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearAlert, showAlert } from "../feedback/feedbackSlice";
import { clearComments, clearJobInputFields, setFalseToJobEditingAndJobIdToNull} from "./jobSlice";

const API_JOBS_URL = "/api/v1/jobs";
const API_COMMENTS_URL = '/api/v1/comments'

export const createJob = createAsyncThunk(
  "job/add",
  async (jobData, thunkAPI) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(API_JOBS_URL, jobData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      thunkAPI.dispatch(showAlert({ status: 'success', description: 'Job added'}))

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      return thunkAPI.rejectWithValue();
    } finally {
      thunkAPI.dispatch(clearJobInputFields());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    }
  }
);

export const getAllJobs = createAsyncThunk('job/getAllJobs',  async( _, thunkAPI) => {
  const { job: { page, search, searchStatus, searchType, sort} } = thunkAPI.getState()
  const token = localStorage.getItem('token')
  try {
    let url = `${API_JOBS_URL}?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if(search) {
      url = url + `&search=${search}`
    }

    const response = await axios(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.log(error)
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})

export const getSingleJob = createAsyncThunk('job/getSingleJob', async( id, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios( `${API_JOBS_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})

export const getJobsByUser = createAsyncThunk('job/getjobbyuser', async( id, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios( `${API_JOBS_URL}/createdBy/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  return thunkAPI.rejectWithValue(message);
  }finally {

  }
})

export const getStats = createAsyncThunk('job/getStats', async( _, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios( `${API_JOBS_URL}/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  return thunkAPI.rejectWithValue(message);
  }finally {

  }
})




export const getRelatedJobs = createAsyncThunk('job/relatedJobs', async( id, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios( `${API_JOBS_URL}/${id}/relatedJobs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})

export const deleteJob = createAsyncThunk('job/deleteJob', async( id, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_JOBS_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data)
    thunkAPI.dispatch(showAlert({ status: 'success', description: response.data.message}))
    return id;
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})


export const updateJob = createAsyncThunk('job/updateJob', async({id, jobData} , thunkAPI) => {
  const token = localStorage.getItem('token')
  console.log(jobData)

  try {
    const response = await axios.patch( `${API_JOBS_URL}/${id}`, jobData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    thunkAPI.dispatch(showAlert({ status: 'success', description: 'Job Updated'}))
    thunkAPI.dispatch(clearJobInputFields())
    thunkAPI.dispatch(setFalseToJobEditingAndJobIdToNull())
    return response.data;

  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})


export const createComment = createAsyncThunk('job/addcomment', async(commendData, thunkAPI) => {
  const token = localStorage.getItem('token')
  console.log(commendData)
  try {
    const response = await axios.post(`${API_COMMENTS_URL}/`, commendData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    thunkAPI.dispatch(showAlert({ status: 'success', description: 'Comment Added'}))

    if(commendData.parentId){
      console.log('reply')
    }else{
      console.log('create')
    }

    if(response.data.count > 50){
      thunkAPI.dispatch(clearComments());
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    thunkAPI.dispatch(showAlert({ status: "error", description: message }));
    return thunkAPI.rejectWithValue();
  } finally {
    thunkAPI.dispatch(clearJobInputFields());
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }

})

export const deleteComment = createAsyncThunk('jobs/deleteCommet', async(id, thunkAPI) => {
  const token = localStorage.getItem('token')
  try {
    await axios.delete(`${API_COMMENTS_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    thunkAPI.dispatch(showAlert({ status: 'success', description: 'Comment Deleted'}))

    return id;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    thunkAPI.dispatch(showAlert({ status: "error", description: message }));
    return thunkAPI.rejectWithValue();
  } finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})

export const updateComment = createAsyncThunk('job/updateComment', async({id, commentData }, thunkAPI) => {
  const token = localStorage.getItem('token')
  console.log(commentData)

  try {
    const response = await axios.patch(`${API_COMMENTS_URL}/${id}`, commentData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response)
    thunkAPI.dispatch(showAlert({ status: 'success', description: 'Comment Updated'}))
    return response.data;

  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  thunkAPI.dispatch(showAlert({ status: "error", description: message }));
  return thunkAPI.rejectWithValue();
  }finally {
    setTimeout(() => {
      thunkAPI.dispatch(clearAlert());
    }, 3000);
  }
})