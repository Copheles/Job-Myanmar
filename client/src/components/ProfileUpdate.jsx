import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeInputUser } from "../redux/features/user/userSlice";
import {
  clearAlert,
  showAlert,
} from "../redux/features/feedback/feedbackSlice";
import { updateUser } from "../redux/features/user/userThunks";
import FormRow from "./FormRow";
import AlertPopUp from "./AlertPopUp";
import { FaLocationArrow, FaUserAlt } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";
import moment from "moment";

const ProfileUpdate = () => {
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);
  const { user } = useSelector((state) => state.user);
  const { name, email, location, createdAt } = user;
  const date = moment(createdAt).format("MMM Do, YYYY");

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name || !email || !location) {
      dispatch(
        showAlert({
          status: "error",
          description: "Please add all values",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      dispatch(updateUser({ name, email, location }));
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeInputUser({ name, value }));
  };

  return (
    <Flex
      justifyContent={{ base: 'center', lg: 'flex-start'}}
      flexDir={{ base: "column", lg: "row" }}
      py={{ base: 3, lg: 10}}
      maxW='5xl'
    >
      {isShowAlert && <AlertPopUp {...alertDetails} />}

      <Flex
        flexDirection="column"
        px={{ base: 10, lg: 2 }}
        w={{ base: "100%", lg: "30%" }}
        mb={{ base: 10, lg: 0 }}
      >
        <Box textAlign="center" mb={5}>
          <Avatar size="lg" alignItems="center" mb={5} />
          <Heading textAlign="center" fontSize={{ base: "24px" }} mb={3}>
            {name}
          </Heading>
          <Heading
            fontSize={{ base: "14px" }}
            textAlign="center"
            color={mode("gray.500", "gray.500")}
          >
            Joined on {date}
          </Heading>
        </Box>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} mb={{ base: 5, lg: 0}} flex={1}>
        <FormRow
          type="text"
          name="name"
          icon={<FaUserAlt />}
          value={name}
          handleChange={handleChange}
          labelText="Name"
        />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          labelText="Email"
          icon={<EmailIcon />}
        />
        <FormRow
          type="text"
          name="location"
          value={location}
          handleChange={handleChange}
          labelText="Location"
          icon={<FaLocationArrow />}
        />

        <Button
          w="full"
          colorScheme="red"
          mt={{ base: 0, md: 8 }}
          mb={5}
          onClick={handleUpdate}
        >
          Save Changes
        </Button>
      </SimpleGrid>
    </Flex>
  );
};

export default ProfileUpdate;
