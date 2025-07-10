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
  bcg,
}: StatsBox) {
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      borderLeft="4px solid"
      borderLeftColor={color}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: bcg,
        opacity: 0.1,
        zIndex: 0,
      }}
    >
      <Flex position="relative" zIndex={1} direction="column" gap={2}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box p={2} bg={bcg} borderRadius="md" color={color}>
            {icon}
          </Box>
          <Heading fontSize={{ base: 20, md: 25 }} color={color}>
            {count}
          </Heading>
        </Flex>
        <Heading
          fontSize={{ base: 15, md: 20 }}
          color={textColor}
          fontWeight="medium"
          mt={2}
        >
          {title}
        </Heading>
      </Flex>
    </Box>
  );
}
