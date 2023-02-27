import React from "react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatsItem from "./StatsItem";
import { useSelector } from "react-redux";
import { SimpleGrid } from "@chakra-ui/react";

const StatsContainer = () => {
  const { stats } = useSelector((state) => state.job);

  const defaultStats = [
    {
      title: "Pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling size={30} />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck size={30} />,
      color: "#647acb",
      bcg: "#fcefc7",
    },
    {
      title: "Jobs declined",
      count: stats.declined || 0,
      icon: <FaBug size={30} />,
      color: "#d66a6a",
      bcg: "#fcefc7",
    },
  ];

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, xl: 3}}   
        gap={10}
        px={{ base: 2, lg: 10 }}
        py={{ base: 5, lg: 20 }}
      >
        {defaultStats.map((item, index) => {
          return <StatsItem key={index} {...item} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default StatsContainer;
