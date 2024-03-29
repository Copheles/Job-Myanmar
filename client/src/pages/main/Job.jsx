import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import JobDetails from "../../components/JobDetails";
import RelatedJobs from "../../components/RelatedJobs";
import { useSelector } from "react-redux";
import AlertPopUp from "../../components/AlertPopUp";

const Job = () => {
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);
  const { id } = useParams();
  return (
    <Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={3}>
      <Box w={{ base: "100%", lg: "70%" }}>
        {isShowAlert && <AlertPopUp {...alertDetails} />}
        <JobDetails id={id} />
      </Box>
      <Box w={{ base: "100%", lg: "30%" }}>
        <RelatedJobs id={id} />
      </Box>
    </Box>
  );
};

export default Job;
