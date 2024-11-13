import { Box, useColorModeValue as mode, Spinner } from "@chakra-ui/react";
import { useGetStatsQuery } from "@features/Main/AllJobs/slice/jobApiSlice";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";

export default function StatsPage() {
  const { data, isLoading } = useGetStatsQuery({});

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
      ) : (
        <Box bg={mode("white", "gray.700")}>
          <StatsContainer defaultStats={data.defaultStats} />
          {data?.monthlyApplication.length > 0 && (
            <ChartsContainer monthlyApplication={data?.monthlyApplication} />
          )}
        </Box>
      )}
    </>
  );
}
