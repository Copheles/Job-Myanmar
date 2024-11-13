import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

interface StatsBox {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

export default function StatsItem({
  title,
  count,
  icon,
  color,
}: StatsBox) {
  return (
    <Box
      p={10}
      bg={useColorModeValue("gray.100", "RGBA(255, 255, 255, 0.04)")}
      color={color}
      borderBottom="5px solid"
      borderBottomColor={color}
      h={{ base: "180px", lg: "200px" }}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={12}>
        <Heading>{count}</Heading>
        {icon}
      </Flex>
      <Heading fontSize={{ base: 15, lg: 20 }}>{title}</Heading>
    </Box>
  );
}
