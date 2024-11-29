import { SimpleGrid } from "@chakra-ui/react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatsItem from "./StatsItem";

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
  const stats: StatsBox[] = [
    {
      title: "Pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling size={25} />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck size={25} />,
      color: "#647acb",
      bcg: "#fcefc7",
    },
    {
      title: "Jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug size={25} />,
      color: "#d66a6a",
      bcg: "#fcefc7",
    },
  ];

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, xl: 3 }}
        gap={10}
        px={{ base: 8, lg: 10 }}
        py={{ base: 5, lg: 20 }}
      >
        {stats.map((item) => {
          return <StatsItem key={item.title} {...item} />;
        })}
      </SimpleGrid>
    </>
  );
}
