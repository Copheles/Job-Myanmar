import { Box, Spinner, useColorModeValue as mode } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStats } from '../../redux/features/job/jobThunks';
import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartContainer';

const Stats = () => {

  const { isLoading, monthlyApplication } = useSelector((state) => state.job)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])

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
      ): (
        <Box bg={mode("white", "gray.700")}>
          <StatsContainer />
          { monthlyApplication.length > 0 && (
            <ChartsContainer />
          )}
        </Box>
      
      )}

    </>
  )
}

export default Stats