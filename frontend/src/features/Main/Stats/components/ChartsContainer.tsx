import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import useLanguage from "@hooks/useLanguage";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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
  const { language } = useLanguage();
  const barColor = useColorModeValue("#2F855A", "#68D391");

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading textAlign="center" mb={7} fontSize={{ base: 17, md: 23 }}>
        {language.statsPage.monthlyApplicationsHeader}
      </Heading>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={monthlyApplication}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '30px' }} />
          <Bar dataKey="count" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}
