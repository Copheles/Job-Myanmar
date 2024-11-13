import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  monthlyApplication: [
    {
      date: string;
      count: number;
    }
  ];
}

export default function ChartsContainer({ monthlyApplication }: Props) {
  console.log(monthlyApplication);
  const barColor = useColorModeValue("#2F855A", "#68D391");

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading textAlign="center" mb={7}>
        Monthly Applications
      </Heading>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={monthlyApplication}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}
