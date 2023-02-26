import { Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeInputUser } from "../redux/features/user/userSlice";
import { clearAlert, showAlert } from "../redux/features/feedback/feedbackSlice";
import { updateUser } from "../redux/features/user/userThunks";
import FormRow from './FormRow';
import AlertPopUp from './AlertPopUp';
import { FaLocationArrow, FaUserAlt } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";

const ProfileUpdate = () => {

  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);
  const { user } = useSelector((state) => state.user);
  const {  name, email, location } = user;

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
    <>
      {isShowAlert && <AlertPopUp {...alertDetails} />}
      <SimpleGrid mt={10} columns={{ base: 1, md: 2 }} gap={3}>
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
    </>
  );
};

export default ProfileUpdate;
