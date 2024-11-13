import { Box } from "@chakra-ui/react";
import { useGetSingleJobQuery } from "@features/Main/AllJobs/slice/jobApiSlice";
import { useParams } from "react-router-dom";
import JobDetails from "../components/JobDetails";
import RelatedJobs from "@features/Main/SingleJob/components/RelatedJobs";

export default function SingleJob() {
  const { id } = useParams();
  const { data } = useGetSingleJobQuery(id);

  console.log(data);

  return (
    <Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={3}>
      {data && (
        <>
          <Box w={{ base: "100%", lg: "70%" }}>
            <JobDetails job={data.job} />
          </Box>
          <Box w={{ base: "100%", lg: "30%" }}>
            <RelatedJobs id={data.job._id} company={data.job.company} aboutCompany={data.job.aboutCompany} />
          </Box>
        </>
      )}
    </Box>
  );
}
