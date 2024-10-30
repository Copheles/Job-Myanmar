import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useGetAllJobsQuery } from "../slice/jobApiSlice";
import JobCard from "./JobCard";

export default function JobsContainer() {

  const { data } = useGetAllJobsQuery({}); 
  

  return (
    <>
      <Heading mb={5} fontSize={{ base: "15px", md: "20px" }}>
        Found
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2}} gap={5}>
        {
          data?.jobs?.map((job: any) => (
            <JobCard key={job._id} job={job} />
          ))
        }
      </SimpleGrid>
    </>
  );
}
