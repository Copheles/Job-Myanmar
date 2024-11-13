import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  SkeletonText,
  SimpleGrid,
  useColorModeValue as mode,
  SkeletonCircle,
} from "@chakra-ui/react";

export default function JobCardSkeleton() {
  return (
    <Card
      pb={5}
      borderLeft="3px solid"
      borderLeftColor={mode("gray.200", "red.200")}
      cursor="pointer"
      _hover={{ bg: mode("gray.50", "gray.600") }}
    >
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex gap={3} alignItems="center">
            <SkeletonCircle  size="40px">
              <Avatar size="sm" />
            </SkeletonCircle>
            <Box px={{ base: 2, md: 0 }}>
              <SkeletonText noOfLines={1} width="100px" />
            </Box>
          </Flex>
          <SkeletonText noOfLines={1} width="50px" />
        </Flex>
      </CardHeader>
      <Flex ml={5} alignItems="flex-start" direction="column">
        <SkeletonText noOfLines={1} width="120px" mt={2} />
        <SkeletonText noOfLines={1} width="80px" mt={3} />
      </Flex>
      <CardBody display="flex" flexDir="column" gap={{ base: 3, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 4, md: 0 }}>
          <SkeletonText noOfLines={1} width="100px" />
          <SkeletonText noOfLines={1} width="100px" />
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          gap={{ base: 4, md: 0 }}
          mt={1}
        >
          <SkeletonText noOfLines={1} width="100px" />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
