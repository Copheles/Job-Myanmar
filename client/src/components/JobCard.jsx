import {
  CheckCircleIcon,
  NotAllowedIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IconDesign from "./IconDesign";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  const {
    position,
    company,
    jobLocation,
    createdAt,
    createdBy: { name },
    status,
    jobType,
    _id: jobId,
  } = job;
  const { name: username } = useSelector((state) => state.user.user);

  const fromNow = moment(createdAt).fromNow();

  const navigate = useNavigate();
  const bTcolor = mode("gray.200", "red.200");

  const statusColor =
    status === "interview"
      ? mode("#38A169", "#68D391")
      : status === "pending"
      ? mode("#F6E05E", "#D69E2E")
      : mode("#E53E3E", "#FC8181");

  const statusIcon =
    status === "interview" ? (
      <CheckCircleIcon color={statusColor} />
    ) : status === "pending" ? (
      <WarningTwoIcon color={statusColor} />
    ) : (
      <NotAllowedIcon color={statusColor} />
    );

  const handleClick = () => {
    navigate(`/job/${jobId}`);
  };

  return (
    <Card
      pb={5}
      borderLeft="3px solid"
      borderLeftColor={bTcolor}
      cursor="pointer"
      _hover={{ background: mode("gray.50", "gray.600") }}
      onClick={handleClick}
    >
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={3} alignItems='center'>
            <Avatar
              name={company}
              bg={mode("red.500", "red.200")}
              color="white"
              size={{ base: "sm", md: "md" }}
            />
            <Box px={{ base: 2, md: 0}}>
              <Text>{company}</Text>
            </Box>
          </Flex>
          <Text color={mode("gray.500", "gray.500")}>{fromNow}</Text>
        </Flex>
      </CardHeader>

      <Flex ml={5} alignItems="center" display='column'>
        <Heading size={{ base: 'xs', md: 'sm'}}>{position}</Heading>
        <Text color={mode("gray.500", "gray.500")} mt={3}>
          Posted by{" "}
          {name === username ? <Badge colorScheme="green">you</Badge> : name}
        </Text>
      </Flex>
      <CardBody display="flex" flexDir="column" gap={{ base: 3, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 4, md: 0 }}>
          <IconDesign label={jobLocation} icon={<FaLocationArrow />} />
          <IconDesign label={jobType} icon={<FaBriefcase />} />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 4, md: 0 }} mt={{ base: 3, md: 0}}>
          <IconDesign label={status} icon={statusIcon} />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default JobCard;
