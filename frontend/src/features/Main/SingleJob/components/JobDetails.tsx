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
  Divider,
  Flex,
  Heading,
  IconButton,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import IconDesign from "@components/IconDesign";
import { openModal } from "@components/modal/modalSlice";
import ShowTextToHtml from "@components/ShowTextToHtml";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import moment from "moment";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  job: any;
}

export default function JobDetails({ job }: Props) {
  const {
    company,
    position,
    jobLocation,
    jobType,
    jobDescription,
    createdAt,
    createdBy: jobOwner,
    status,
  } = job;

  const { userInfo } = useAppSelector((state) => state.auth);
  const date = moment(createdAt).format("MMM Do, YYYY");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "JobDeleteModal",
        header: "Deleting Job",
        bodyText: "Are you sure to delete Job?",
        id: job._id,
      })
    );
  };

  const handleEdit = () => {
    navigate(`/add-job?id=${job._id}`)
  }

  return (
    <Box>
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
              fontSize={{ base: "14px", md: "18px" }}
              ml={4}
              fontWeight="thin"
              color={mode("gray.600", "gray.300")}
            >
              {company}
            </Heading>
          </Flex>
          {jobOwner === userInfo?.id && (
            <Flex>
              <IconButton
                aria-label="delete"
                variant="ghost"
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={handleDelete}
              />
              <IconButton
                aria-label="edit"
                variant="ghost"
                colorScheme="yellow"
                icon={<EditIcon />}
                onClick={handleEdit}
              />
            </Flex>
          )}
        </Flex>
        <Heading
          mt={5}
          fontSize={{ base: "20px", md: "25px" }}
          fontWeight={100}
        >
          {position}
        </Heading>
        <Flex
          gap={5}
          mt={{ base: 10, md: 12 }}
          mb={{ base: 10, md: 12 }}
          direction={{ base: "column", md: "row" }}
        >
          <IconDesign label={jobLocation} icon={<FaLocationArrow />} />
          <IconDesign label={jobType} icon={<FaBriefcase />} />
          <IconDesign label={status} icon={statusIcon} />
          <IconDesign label={date} icon={<CalendarIcon />} />
        </Flex>
        <ShowTextToHtml value={jobDescription} />
        <Divider />
      </Box>
    </Box>
  );
}
