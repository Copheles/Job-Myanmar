import { Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AlertPopUp from "./AlertPopUp";
import FormRow from "./FormRow";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAlert,
  showAlert,
} from "../redux/features/feedback/feedbackSlice";
import { LockIcon } from "@chakra-ui/icons";
import { changePassword } from '../redux/features/user/userThunks';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
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
      setNewPassword('')
      setConfirmNewPassword('')
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } else {
      const updatePasswordData = { oldPassword, newPassword };
      dispatch(changePassword(updatePasswordData))
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    }
  };

  return (
    <>
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
    </>
  );
};

export default ChangePassword;
