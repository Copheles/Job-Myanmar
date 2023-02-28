import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import AreaChart from "./AreaChart";
import { useSelector } from "react-redux";
import { useState } from "react";
import BarChart from "./BarChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplication: data } = useSelector((state) => state.job);

  return (
    <Flex flexDirection="column"  alignItems="center">
      <Heading textAlign="center" mb={7}>
        Monthly Applications
      </Heading>
      <Button
        color={useColorModeValue("green.500", "green.200")}
        variant="unstyle"
        onClick={() => setBarChart(!barChart)}
        mb={10}
      >
        {barChart ? "AreaChart" : "BarChart"}
      </Button>
      <Box
        px={{ base: 5, lg: "50px" }}
        mb={10}
        mt={5}
        h={{ base: "50vh", lg: "60vh" }}
        w={{ base: "100%", lg: "80%" }}
      >
        {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
      </Box>
    </Flex>
  );
};

export default ChartsContainer;
