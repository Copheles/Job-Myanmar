import { SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatsItem from "./StatsItem";
import useLanguage from "@hooks/useLanguage";

interface Props {
  defaultStats: {
    declined: number;
    interview: number;
    pending: number;
  };
}

interface StatsBox {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

export default function StatsContainer({ defaultStats }: Props) {
  const { language } = useLanguage();

  const stats: StatsBox[] = [
    {
      title: language.statsPage.pendingHeader,
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: useColorModeValue("yellow.500", "yellow.300"),
      bcg: useColorModeValue("yellow.100", "yellow.900"),
    },
    {
      title: language.statsPage.interviewHeader,
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: useColorModeValue("blue.500", "blue.300"),
      bcg: useColorModeValue("blue.100", "blue.900"),
    },
    {
      title: language.statsPage.jobsDeclinedHeader,
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: useColorModeValue("red.500", "red.300"),
      bcg: useColorModeValue("red.100", "red.900"),
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
      {stats.map((item) => (
        <StatsItem key={item.title} {...item} />
      ))}
    </SimpleGrid>
  );
}
