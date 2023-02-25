import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import FormRow from "../../components/FormRow";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteIcon } from "@chakra-ui/icons";
import { getJobsByUser} from "../../redux/features/job/jobThunks";
import { handleChangeInputUser } from "../../redux/features/user/userSlice";
import { clearAlert, showAlert } from "../../redux/features/feedback/feedbackSlice";
import { deleteUser, updateUser } from "../../redux/features/user/userThunks";
import AlertPopUp from '../../components/AlertPopUp';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const {  jobsBySingleUser } = useSelector((state) => state.job);
  const { _id, name, email, createdAt, location } = user;

  const { isShowAlert, alertDetails } =useSelector((state) => state.feedback)


  const date = moment(createdAt).format("MMM Do, YYYY");

  useEffect(() => {
    dispatch(getJobsByUser(_id))
  }, [_id, dispatch])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeInputUser({ name, value}))
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if(!name || !email || !location) {
      dispatch(
        showAlert({
          status: "error",
          description: "Please add all values",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
  
    }else{
      dispatch(updateUser({ name, email, location}))
    }
  }

  const handleDelete = () => {
    dispatch(deleteUser());
    navigate('/')
  }


  return (
    <Box bg={mode("white", "gray.700")} p={{ base: 3, md: 5 }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting your account</ModalHeader>
          <ModalCloseButton />

          <ModalBody>Are you sure to delete your account? Your related posts and all related comments will be deleted.</ModalBody>
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
      <Flex justifyContent="space-evenly" gap={5} py={10} direction={{ base: 'column-reverse', lg: 'row'}}>
    
        <Flex flexDirection="column" px={10} w={{ base: '100%', lg: '30%'}} mb={{ base: 10, lg: 0}}>
          <Box textAlign="center" mb={5}>
            <Avatar size="lg" alignItems="center" mb={5} />
            <Heading textAlign="center" fontSize={{ base: "24px" }} mb={3}>
              {name}
            </Heading>
            <Text
              fontSize={{ base: "14px" }}
              textAlign="center"
              color={mode("gray.500", "gray.500")}
            >
              Joined on {date}
            </Text>
          </Box>
          <Divider />
          <Box mt={5}>
            <Flex justifyContent="space-between" mb={5}>
              <Text> Jobs Created</Text>
              <Text>{jobsBySingleUser.length}</Text>
            </Flex>
            <Flex justifyContent="space-between" mb={5}>
              <Text> Interviews</Text>
              <Text color={mode("green.800", "green.200")}>{jobsBySingleUser.filter((job) => job.status === 'interview').length}</Text>
            </Flex>
            <Flex justifyContent="space-between" mb={5}>
              <Text>Pending</Text>
              <Text color={mode("orange.800", "orange.200")}>{jobsBySingleUser.filter((job) => job.status === 'pending').length}</Text>
            </Flex>
            <Flex justifyContent="space-between" mb={5}>
              <Text> Declined</Text>
              <Text color={mode("red.800", "red.400")}>{jobsBySingleUser.filter((job) => job.status === 'declined').length}</Text>
            </Flex>
          </Box>
          <Divider />
          <Button mt={10} w="full" colorScheme="red" rightIcon={<DeleteIcon />} onClick={onOpen}>
            Delete Account
          </Button>
        </Flex>

        <Box flex={1} mx={5}>
          { isShowAlert && <AlertPopUp {...alertDetails} />}
          <Heading fontSize={{ base: "20px", md: "30px" }}>Profile</Heading>
          <SimpleGrid mt={10} columns={{ base: 1, md: 2 }} gap={3}>
            <FormRow type="text" name="name" value={name} handleChange={handleChange} labelText="Name" />
            <FormRow type="email" name="email" value={email} handleChange={handleChange} labelText="Email" />
            <FormRow type="text" name="location" value={location} handleChange={handleChange} labelText="Location" />

            <Button w="full" colorScheme="red" mt={{ base: 0, md: 8 }} mb={5} onClick={handleUpdate}>
              Save Changes
            </Button>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
