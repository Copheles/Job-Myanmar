import { Box } from '@chakra-ui/react'
import React from 'react'
import JobsContainer from '../../components/JobsContainer'
import SearchContainer from '../../components/SearchContainer';

const AllJobs = () => {

  return (
    <Box>
      <SearchContainer />
      <JobsContainer />
    </Box>
  )
}

export default AllJobs