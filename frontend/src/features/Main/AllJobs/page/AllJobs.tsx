import { Box } from "@chakra-ui/react";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";

export default function AllJobs() {
  return (
    <Box>
      <SearchContainer />
      <JobsContainer />
    </Box>
  )
}
