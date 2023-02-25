import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRelatedJobs } from "../redux/features/job/jobThunks";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import RelatedJobCard from "./RelatedJobCard";
import { BsFacebook, BsGithub, BsTwitter } from "react-icons/bs";
const RelatedJobs = ({ id }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.job);
  const { relatedJobs, singleJob } = useSelector((state) => state.job);

  const {
    job: { company, aboutCompany },
  } = singleJob;

  useEffect(() => {
    dispatch(getRelatedJobs(id));
  }, [id, dispatch]);

  return (
    <>
      {isLoading ? null : (
        <Box
          px={5}
          mt={{ base: 10, lg: 0 }}
          bg={mode("white", "gray.700")}
          h={{ lg: "100vh" }}
          position="sticky"
          top="120px"
          py={5}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb={10}
          >
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              gap={5}
            >
              <Box
                as="span"
                w={20}
                h="2px"
                bg={mode("red.500", "red.200")}
                flex={1}
              ></Box>
              <Heading
                fontSize={{ base: "20px", md: "25px" }}
                fontWeight="thin"
                textAlign="center"
              >
                About {company}
              </Heading>
              <Box
                as="span"
                w={20}
                h="2px"
                bg={mode("red.500", "red.200")}
                flex={1}
              ></Box>
            </Box>
            <Flex justifyContent="center" mt={10}>
              <Avatar
                name={company}
                size="lg"
                bg={mode("red.500", "red.200")}
                color="white"
              />
            </Flex>
            <Text mt={10} textAlign="center">
              {aboutCompany}
            </Text>
          </Box>

          <Flex justifyContent="space-evenly" mb={10} mx={10}>
            <IconButton icon={<BsFacebook size={20} />} variant="ghost" />
            <IconButton icon={<BsGithub size={20} />} variant="ghost" />
            <IconButton icon={<BsTwitter size={20} />} variant="ghost" />
          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            flexDirection={{ base: "row", lg: "column" }}
            gap={5}
            mt={10}
          >
            <Heading fontSize={{ base: "20px", md: "25px" }} fontWeight="thin">
              Similar Jobs
            </Heading>
            <Link
              as={ReactLink}
              to="/"
              color={mode("red", "red.200")}
              display="flex"
              alignItems="center"
              gap={2}
            >
              views all jobs <FaLongArrowAltRight />
            </Link>
          </Flex>

          <Box mt={8}>
            {relatedJobs.length === 0 ? (
              <Text>No Jobs Found</Text>
            ) : (
              relatedJobs.map((job) => (
                <RelatedJobCard key={job._id} job={job} />
              ))
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RelatedJobs;
