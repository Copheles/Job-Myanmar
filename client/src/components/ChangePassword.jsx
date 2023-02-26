import {
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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AlertPopUp from "./AlertPopUp";
import FormRow from "./FormRow";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAlert,
  showAlert,
} from "../redux/features/feedback/feedbackSlice";
import { DeleteIcon, LockIcon } from "@chakra-ui/icons";
import { changePassword, deleteUser } from "../redux/features/user/userThunks";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      dispatch(
        showAlert({
          status: "error",
          description: "Please provide all values",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else if (newPassword !== confirmNewPassword) {
      dispatch(
        showAlert({
          status: "error",
          description: "Passwords do not match",
        })
      );
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      const updatePasswordData = { oldPassword, newPassword };
      dispatch(changePassword(updatePasswordData));
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };
  const handleDelete = () => {
    dispatch(deleteUser());
    navigate("/");
  };
  return (
    <Flex justifyContent={{ base: 'center', lg: 'flex-start'}}>
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

      <Box maxW='5xl' pl={{ base: 0, lg: 10}}>
        <Heading mt={5} mb={2} fontSize={{ base: 20 }}>
          Change Password
        </Heading>
        <Divider />
        {isShowAlert && <AlertPopUp {...alertDetails} />}
        <SimpleGrid
          mt={10}
          columns={{ base: 1, md: 2 }}
          gap={3}
          as="form"
          onSubmit={handleChangePassword}
         
        >
          <FormRow
            type="password"
            name="Old password"
            value={oldPassword}
            icon={<LockIcon />}
            handleChange={(e) => setOldPassword(e.target.value)}
            labelText="Old password"
            isPassword={true}
          />
          <FormRow
            type="password"
            name="New password"
            value={newPassword}
            icon={<LockIcon />}
            handleChange={(e) => setNewPassword(e.target.value)}
            labelText="New password"
            isPassword={true}
          />
          <FormRow
            type="password"
            name="Confirm new passowrd"
            value={confirmNewPassword}
            icon={<LockIcon />}
            handleChange={(e) => setConfirmNewPassword(e.target.value)}
            labelText="Confirm new passowrd"
            isPassword={true}
          />

          <Button
            w="full"
            colorScheme="red"
            mt={{ base: 0, md: 8 }}
            mb={5}
            type="submit"
          >
            Change Password
          </Button>
        </SimpleGrid>

        <Divider />
        <Button
          mt={10}
          variant="ghost"
          colorScheme="red"
          rightIcon={<DeleteIcon />}
          onClick={onOpen}
        >
          Delete Account
        </Button>
      </Box>
    </Flex>
  );
};

export default ChangePassword;
