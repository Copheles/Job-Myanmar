import { Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AreaChart from "./AreaChart";
import { useSelector } from "react-redux";
import { useState } from "react";
import BarChart from "./BarChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplication: data } = useSelector((state) => state.job);

  return (
    <Flex flexDirection="column" justifyContent='center' alignItems='center'>
      <Heading textAlign='center' mb={7}>Monthly Applications</Heading>
      <Button color={useColorModeValue('green.500', 'green.200')} variant="unstyle" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </Button>
      {
        barChart ? <BarChart data={data} /> : <AreaChart data={data} />
      }
    </Flex>
  );
};

export default ChartsContainer;
