import { CheckCircleIcon, NotAllowedIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  useColorModeValue as mode,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import IconDesign from "@components/IconDesign";
import { useAppSelector } from "@redux/hooks";
import moment from "moment";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }: { job: any }) {
  const { userInfo } = useAppSelector((state) => state.auth);
  const fromNow = moment(job.createdAt).fromNow();

  const navigate = useNavigate();

  const statusColor =
    job.status === "interview"
      ? mode("#38A169", "#68D391")
      : job.status === "pending"
      ? mode("#F6E05E", "#D69E2E")
      : mode("#E53E3E", "#FC8181");

  const statusIcon =
    job.status === "interview" ? (
      <CheckCircleIcon color={statusColor} />
    ) : job.status === "pending" ? (
      <WarningTwoIcon color={statusColor} />
    ) : (
      <NotAllowedIcon color={statusColor} />
    );

  const handleClick = (id: string) => {
    navigate(`/jobs/${id}`)
  }

  return (
    <Card
      pb={5}
      borderLeft="3px solid"
      borderLeftColor={mode("gray.200", "red.200")}
      cursor="pointer"
      _hover={{ bg: mode("gray.50", "gray.600") }}
      onClick={() => handleClick(job._id)}
    >
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex gap={3} alignItems="center">
            <Avatar
              name={job.company}
              bg={mode("red.500", "red.200")}
              color={mode("gray.100", "teal.50")}
              size={{ base: "sm", md: "md" }}
            />
            <Box px={{ base: 2, md: 0 }}>
              <Text fontWeight='medium' fontSize={{ base: 13, md: 16}}>{job.company}</Text>
            </Box>
          </Flex>
          <Text color={mode("gray.500", "gray.500")} fontSize={{ base: 12, md: 14}}>{fromNow}</Text>
        </Flex>
      </CardHeader>
      <Flex ml={5} alignItems="flex-start" direction="column">
        <Heading fontSize={{ base: 13, md: 15 }}>{job.position}</Heading>
        <Text color={mode("gray.500", "gray.500")} fontSize={{ base: 12, md: 15}} mt={3}>
          Posted by{" "}
          {job.createdBy.name === userInfo?.name ? (
            <Badge fontSize={{ base: 10, md: 12}} colorScheme="green">you</Badge>
          ) : (
            job.createdBy.name
          )}
        </Text>
      </Flex>
      <CardBody display="flex" flexDir="column" gap={{ base: 3, md: 8 }}>
        <SimpleGrid columns={{ base: 2, sm: 2 }} gap={{ base: 4, md: 0 }}>
          <IconDesign label={job.jobLocation} icon={<FaLocationArrow />} />
          <IconDesign label={job.jobType} icon={<FaBriefcase />} />
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          gap={{ base: 4, md: 0 }}
          mt={{ base: 1, md: 0 }}
        >
          <IconDesign label={job.status} icon={statusIcon} />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
