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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteIcon } from "@chakra-ui/icons";
import { getJobsByUser } from "../../redux/features/job/jobThunks";
import { deleteUser } from "../../redux/features/user/userThunks";

import { useNavigate } from "react-router-dom";
import ProfileUpdate from "../../components/ProfileUpdate";
import ChangePassword from "../../components/ChangePassword";
import { clearAlert } from "../../redux/features/feedback/feedbackSlice";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { jobsBySingleUser } = useSelector((state) => state.job);
  const { _id, name, createdAt} = user;

  

  const date = moment(createdAt).format("MMM Do, YYYY");

  useEffect(() => {
    dispatch(getJobsByUser(_id));
  }, [_id, dispatch]);

  
  const handleTabChange = (index) => {
    setActiveTab(index)
    dispatch(clearAlert())
  }

  const handleDelete = () => {
    dispatch(deleteUser());
    navigate("/");
  };

  return (
    <Box bg={mode("white", "gray.700")} p={{ base: 3, md: 5 }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting your account</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            Are you sure to delete your account? Your related posts and all
            related comments will be deleted.
          </ModalBody>
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
      <Flex
        justifyContent="space-evenly"
        gap={5}
        py={10}
        direction={{ base: "column-reverse", lg: "row" }}
      >
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
              <Text color={mode("green.800", "green.200")}>
                {
                  jobsBySingleUser.filter((job) => job.status === "interview")
                    .length
                }
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb={5}>
              <Text>Pending</Text>
              <Text color={mode("orange.800", "orange.200")}>
                {
                  jobsBySingleUser.filter((job) => job.status === "pending")
                    .length
                }
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb={5}>
              <Text> Declined</Text>
              <Text color={mode("red.800", "red.400")}>
                {
                  jobsBySingleUser.filter((job) => job.status === "declined")
                    .length
                }
              </Text>
            </Flex>
          </Box>
          <Divider />
          <Button
            mt={10}
            w="full"
            colorScheme="red"
            rightIcon={<DeleteIcon />}
            onClick={onOpen}
          >
            Delete Account
          </Button>
        </Flex>

        <Box flex={1} mx={2} mb={{ base: 10, lg: 0 }}>
    
          <Tabs onChange={handleTabChange}>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProfileUpdate/>
              </TabPanel>
              <TabPanel>
                <ChangePassword/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
