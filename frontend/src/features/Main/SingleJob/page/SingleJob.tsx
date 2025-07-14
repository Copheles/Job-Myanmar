import { Box, useColorModeValue as mode } from "@chakra-ui/react";
import { useGetSingleJobQuery } from "@features/Main/AllJobs/slice/jobApiSlice";
import { useParams } from "react-router-dom";
import JobDetails from "../components/JobDetails";
import RelatedJobs from "@features/Main/SingleJob/components/RelatedJobs";
import CommenContainer from "../components/CommentContainer";
import { useEffect } from "react";
import { useSocket } from "@hooks/useSocket";

export default function SingleJob() {
  const { id } = useParams();
  const { data } = useGetSingleJobQuery(id);
  const { emitEvent } = useSocket();
  const bg = mode("white", "gray.700");

  console.log(data);

  useEffect(() => {
    if (id) {
      emitEvent("join room", { room: id });
      console.log('Join job : ', id)
    }

    return () => {
      if (id) {
        emitEvent("leave room", { room: id });
        console.log('Leave job: ',id)
      }
    };
  }, [id]);

  return (
    <Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={3}>
      {data && (
        <>
          <Box
            p={{ base: 2, md: 4 }}
            px={{ base: 4, md: 6 }}
            w={{ base: "100%", lg: "70%" }}
            bg={bg}
          >
            <JobDetails job={data.job} />
            <CommenContainer
              owner={data.job.createdBy}
              comments={data.comments}
              jobId={id}
            />
          </Box>
          <Box w={{ base: "100%", lg: "30%" }}>
            <RelatedJobs
              id={data.job._id}
              company={data.job.company}
              aboutCompany={data.job.aboutCompany}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
