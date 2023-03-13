import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../redux/features/job/jobThunks";
import Pagination from "./Pagination";
import { logoutUser } from "../redux/features/user/userSlice";
import { clearAlert } from "../redux/features/feedback/feedbackSlice";

const JobsContainer = () => {
  const { alertDetails } = useSelector((state) => state.feedback);

  const {
    jobs,
    page,
    isLoading,
    searchType,
    searchStatus,
    sort,
    searchText,
    numOfPages,
    totalJobs,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch, page, searchType, searchText, searchStatus, sort]);

  if(alertDetails.description === 'Authentication Invalid'){
    dispatch(clearAlert())
    dispatch(logoutUser());
  }

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="screen"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor={mode("gray.100", "gray.600")}
            color={mode("red.600", " red.200")}
            size="xl"
          />
        </Box>
      ) : numOfPages === 0 ? (
        <Heading textAlign="center">No jobs to display</Heading>
      ) : (
        <>
          <Heading mb={5} fontSize={{ base: "15px", md: "20px" }}>
            {totalJobs} {totalJobs === 1 ? "Job" : "Jobs"} Found
          </Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
            {jobs?.map((job) => (
              <JobCard job={job} key={job._id} />
            ))}
          </SimpleGrid>
          {numOfPages !== 1 && (
            <Flex justifyContent="flex-end">
              <Pagination />
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default JobsContainer;
