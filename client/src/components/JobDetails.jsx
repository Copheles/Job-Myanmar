import {
  CalendarIcon,
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  NotAllowedIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editingJob } from "../redux/features/job/jobSlice";
import { deleteJob, getSingleJob } from "../redux/features/job/jobThunks";
import CommentContainer from "./CommentContainer";
import IconDesign from "./IconDesign";
import ShowTextToHtml from "./ShowTextToHtml";

const JobDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const {
    job: {
      company,
      position,
      jobLocation,
      jobDescription,
      createdAt,
      createdBy: jobOwner,
      status,
      jobType,
    },
    comments,
  } = useSelector((state) => state.job.singleJob);
  const { _id: userId } = useSelector((state) => state.user.user);
  const { isLoading } = useSelector((state) => state.job);
  const date = moment(createdAt).format("MMM Do, YYYY");

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

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteJob(id));
    navigate("/");
  };
  const handleEdit = () => {
    dispatch(editingJob(id));
    navigate("/add-job");
  };

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [id, dispatch]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting Job</ModalHeader>
          <ModalCloseButton />

          <ModalBody>Are you sure to delete Job?</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="screen"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="pink"
            size="xl"
          />
        </Box>
      ) : (
        <Box
          bg={mode("white", "gray.700")}
          p={{ base: 2, md: 4 }}
          px={{ base: 4, md: 6 }}
          pt={5}
        >
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              <Avatar
                name={company}
                bg={mode("red.500", "red.200")}
                color="white"
                size={{ base: "sm", md: "md" }}
              />
              <Heading
                fontSize={{ base: "15px", md: "20px" }}
                ml={4}
                fontWeight="thin"
                color={mode("gray.600", "gray.300")}
              >
                {company}
              </Heading>
            </Flex>
            {jobOwner === userId && (
              <Flex>
                <IconButton
                  variant="ghost"
                  icon={<DeleteIcon />}
                  onClick={onOpen}
                />
                <IconButton
                  variant="ghost"
                  icon={<EditIcon />}
                  onClick={handleEdit}
                />
              </Flex>
            )}
          </Flex>
          <Heading
            mt={5}
            fontSize={{ base: "25px", md: "30px" }}
            fontWeight={100}
          >
            {position}
          </Heading>
          <Flex
            gap={5}
            mt={{base: 10, md: 12}}
            mb={{ base: 10, md: 12}}
            direction={{ base: "column", md: "row" }}
          >
            <IconDesign label={jobLocation} icon={<FaLocationArrow />} />
            <IconDesign label={jobType} icon={<FaBriefcase />} />
            <IconDesign label={status} icon={statusIcon} />
            <IconDesign label={date} icon={<CalendarIcon />} />
          </Flex>
          <ShowTextToHtml value={jobDescription} />
          <Divider />
          <CommentContainer
            comments={comments}
            job={id}
            jobOwnerId={jobOwner}
          />
        </Box>
      )}
    </Box>
  );
};

export default JobDetails;
