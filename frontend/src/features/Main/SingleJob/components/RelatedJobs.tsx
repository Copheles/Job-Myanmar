import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useGetRelatedJobsQuery } from "@features/Main/AllJobs/slice/jobApiSlice";
import { BsFacebook, BsGithub, BsTwitter } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import RelatedJobCard from "./RelatedJobCard";
import useLanguage from "@hooks/useLanguage";
import { useAppSelector } from "@redux/hooks";

interface Props {
  id: string;
  company: string;
  aboutCompany: string;
}

export default function RelatedJobs({ id, company, aboutCompany }: Props) {
  const { data } = useGetRelatedJobsQuery(id);
  const { currentLanguage } = useAppSelector((state) => state.language);
  const { language } = useLanguage();
  return (
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
          {currentLanguage === "mm" ? (
            <Heading
              fontSize={{ base: 17, md: 20 }}
              fontWeight="medium"
              textAlign="center"
            >
              {company} {language.singleJobText.aboutLabel}
            </Heading>
          ) : (
            <Heading
              fontSize={{ base: 17, md: 20 }}
              fontWeight="thin"
              textAlign="center"
            >
              {language.singleJobText.aboutLabel} {company}
            </Heading>
          )}
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
        <Text mt={10} textAlign="center" fontSize={{ base: 14, md: 17 }}>
          {aboutCompany}
        </Text>
      </Box>

      <Flex justifyContent="space-evenly" mb={10} mx={10}>
        <IconButton
          aria-label="facebook"
          icon={<BsFacebook size={20} />}
          variant="ghost"
        />
        <IconButton
          aria-label="github"
          icon={<BsGithub size={20} />}
          variant="ghost"
        />
        <IconButton
          aria-label="twitter"
          icon={<BsTwitter size={20} />}
          variant="ghost"
        />
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
        <Heading fontSize={{ base: 12, md: 18 }} fontWeight="thin">
          {language.singleJobText.similarJobs}
        </Heading>
        <Link
          as={ReactLink}
          to="/"
          color={mode("red", "red.200")}
          display="flex"
          alignItems="center"
          gap={2}
          fontSize={{ base: 12, md: 18 }}
        >
          {language.singleJobText.viewAllJobs} <FaLongArrowAltRight />
        </Link>
      </Flex>

      <Box mt={8}>
        {data?.jobs.length === 0 ? (
          <Text fontSize={{ base: 12, md: 15 }}>{language.singleJobText.notJobsFound}</Text>
        ) : (
          data?.jobs.map((job: any) => (
            <RelatedJobCard key={job._id} job={job} />
          ))
        )}
      </Box>
    </Box>
  );
}
