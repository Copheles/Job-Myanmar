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
  SimpleGrid,
} from "@chakra-ui/react";
import IconDesign from "@components/IconDesign";
import { openModal } from "@components/modal/modalSlice";
import ShowTextToHtml from "@components/ShowTextToHtml";
import useLanguage from "@hooks/useLanguage";
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

  const { language } = useLanguage();

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
        header: language.deleteModal.text,
        bodyText: language.deleteModal.description,
        id: job._id,
      })
    );
  };

  const handleEdit = () => {
    navigate(`/jobs/add-job?id=${job._id}`);
  };

  return (
    <Box>
      <Box pt={5}>
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
              ml={{ base: 2, md: 4 }}
              fontWeight="medium"
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
        <Heading mt={5} fontSize={{ base: 17, md: 22 }} fontWeight={600}>
          {position}
        </Heading>
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          spacing={{ base: 3, md: 5 }}
          mt={{ base: 5, md: 10 }}
          mb={{ base: 5, md: 10 }}
        >
          <IconDesign label={jobLocation} icon={<FaLocationArrow />} />
          <IconDesign label={jobType} icon={<FaBriefcase />} />
          <IconDesign label={status} icon={statusIcon} />
          <IconDesign label={date} icon={<CalendarIcon />} />
        </SimpleGrid>
        <ShowTextToHtml value={jobDescription} />
        <Divider />
      </Box>
    </Box>
  );
}
