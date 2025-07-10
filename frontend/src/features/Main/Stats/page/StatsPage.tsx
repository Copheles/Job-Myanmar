import {
  Box,
  Grid,
  Heading,
  SimpleGrid,
  useColorModeValue as mode,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useGetStatsQuery } from "@features/Main/AllJobs/slice/jobApiSlice";
import StatsContainer from "../components/StatsContainer";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import useLanguage from "@hooks/useLanguage";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function StatsPage() {
  const { data, isLoading } = useGetStatsQuery({});
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor={mode("gray.100", "gray.600")}
          color={mode("red.600", "red.200")}
          size="xl"
        />
      </Box>
    );
  }

  // Prepare data for pie chart (status distribution)
  const statusData = [
    {
      name: language.statsPage.pendingHeader,
      value: data?.defaultStats?.pending || 0,
    },
    {
      name: language.statsPage.interviewHeader,
      value: data?.defaultStats?.interview || 0,
    },
    {
      name: language.statsPage.jobsDeclinedHeader,
      value: data?.defaultStats?.declined || 0,
    },
  ];

  return (
    <Box bg={mode("white", "gray.700")} p={6}>
      {/* Stats Breakdown */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        mb={{ base: 5, md: 10 }}
      >
        <Box
          bg={mode("gray.50", "gray.900")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Heading
            fontSize={{ base: 15, md: 20 }}
            mb={2}
            fontWeight="medium"
            color={mode("gray.700", "gray.200")}
          >
            {language.statsPage.averageApplications}
          </Heading>
          <Heading
            color={mode("blue.600", "blue.300")}
            mt={{ base: 3, md: 5 }}
            fontSize={{ base: 20, md: 25 }}
            fontWeight="medium"
          >
            {data?.monthlyApplication?.length > 0
              ? Math.round(
                  data.monthlyApplication.reduce(
                    (acc: number, curr: any) => acc + curr.count,
                    0
                  ) / data.monthlyApplication.length
                )
              : 0}
          </Heading>
        </Box>

        <Box
          bg={mode("gray.50", "gray.900")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Heading
            fontSize={{ base: 15, md: 20 }}
            mb={2}
            fontWeight="medium"
            color={mode("gray.700", "gray.200")}
          >
            {language.statsPage.peakApplicationMonth}
          </Heading>
          <Heading
            size="lg"
            color={mode("blue.600", "blue.300")}
            fontWeight="medium"
            mt={{ base: 3, md: 5 }}
            fontSize={{ base: 20, md: 25 }}
          >
            {data?.monthlyApplication?.length > 0
              ? data.monthlyApplication.reduce((prev: any, current: any) =>
                  prev.count > current.count ? prev : current
                ).date
              : "N/A"}
          </Heading>
        </Box>

        <Box
          bg={mode("gray.50", "gray.900")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Heading
            fontSize={{ base: 15, md: 20 }}
            mb={2}
            fontWeight="medium"
            color={mode("gray.700", "gray.200")}
          >
            {language.statsPage.interviewConversionRate}
          </Heading>
          <Heading
            size="lg"
            color={mode("blue.600", "blue.300")}
            fontWeight="medium"
            mt={{ base: 3, md: 5 }}
            fontSize={{ base: 20, md: 25 }}
          >
            {data?.defaultStats?.pending + data?.defaultStats?.interview > 0
              ? `${Math.round(
                  (data.defaultStats.interview /
                    (data.defaultStats.pending + data.defaultStats.interview)) *
                    100
                )}%`
              : "0%"}
          </Heading>
        </Box>
      </SimpleGrid>
      {/* Dashboard Title */}

      {/* Main Dashboard Grid */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={8}>
        {/* Monthly Applications Bar Chart */}
        <Box
          bg={mode("gray.50", "gray.900")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Heading
            fontSize={{ base: 15, md: 20 }}
            mb={4}
            fontWeight="medium"
            color={mode("gray.700", "gray.200")}
          >
            {language.statsPage.monthlyApplicationsHeader}
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data?.monthlyApplication || []}
              margin={{
                top: 20,
                right: 5, // Reduced from default 30
                left: -40,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={mode("gray.200", "gray.500")}
              />
              <XAxis
                dataKey="date"
                stroke={mode("gray.600", "gray.300")}
                tick={{ fill: mode("#666", "#aaa") }}
                style={{
                  fontSize: window.innerWidth < 768 ? "12px" : "16px",
                  paddingTop: window.innerWidth < 768 ? "20px" : "20px",
                }}
              />
              <YAxis
                stroke={mode("gray.600", "gray.300")}
                tick={{ fill: mode("#666", "#aaa") }}
                style={{
                  fontSize: window.innerWidth < 768 ? "12px" : "16px",
                  paddingTop: window.innerWidth < 768 ? "20px" : "20px",
                }}
              />
              <Tooltip
                content={({ payload, label }) => (
                  <Box
                    bg={mode("white", "gray.700")}
                    p={3}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Text fontWeight="bold">{label}</Text>
                    <Text>{payload?.[0]?.value} applications</Text>
                  </Box>
                )}
              />
              <Bar
                dataKey="count"
                fill={mode("#3182CE", "#63B3ED")}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Application Status Pie Chart */}
        <Box
          bg={mode("gray.50", "gray.900")}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Heading
            fontSize={{ base: 15, md: 20 }}
            mb={4}
            fontWeight="medium"
            color={mode("gray.700", "gray.200")}
          >
            {language.statsPage.applicationStatusDistribution}
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                style={{
                  fontSize: window.innerWidth < 768 ? "8px" : "12px",
                  paddingTop: window.innerWidth < 768 ? "20px" : "20px",
                }}
              >
                {statusData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  fontSize: window.innerWidth < 768 ? "10px" : "12px",
                  paddingTop: window.innerWidth < 768 ? "20px" : "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

      {/* Additional Row - Trend Line Chart */}
      <Box
        bg={mode("gray.50", "gray.900")}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        mb={8}
      >
        <Heading
          fontSize={{ base: 15, md: 20 }}
          mb={4}
          fontWeight="medium"
          color={mode("gray.700", "gray.200")}
        >
          {language.statsPage.applicationTrendOverTime}
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data?.monthlyApplication || []}
            margin={{
              top: 20,
              right: 5, // Reduced from default 30
              left: -45,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={mode("#eee", "#555")}
            />
            <XAxis
              dataKey="date"
              stroke={mode("#666", "#aaa")}
              style={{
                fontSize: window.innerWidth < 768 ? "12px" : "16px",
                paddingTop: window.innerWidth < 768 ? "20px" : "20px",
              }}
            />
            <YAxis
              stroke={mode("#666", "#aaa")}
              style={{
                fontSize: window.innerWidth < 768 ? "12px" : "16px",
                paddingTop: window.innerWidth < 768 ? "20px" : "20px",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Stats Cards */}
      <StatsContainer defaultStats={data?.defaultStats} />
    </Box>
  );
}
