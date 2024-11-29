import { User } from "@interface/user/user";

export interface getAllJobQuery {
  search?: string;
  status: string;
  jobType: string;
  sort: string;
  page: number;
}

export interface JobResponse {
  totalJobs: number;
  jobs: Job[];
  numOfPages: number;
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  jobDescription: string;
  aboutCompany: string;
  numOfComments: 2;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
