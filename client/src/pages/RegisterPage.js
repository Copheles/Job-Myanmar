import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Logo from "../components/Logo";

import { useEffect, useState } from "react";
import FormRow from "../components/FormRow";
import AlertPopUp from "../components/AlertPopUp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/features/user/userThunks";
import { useNavigate } from "react-router-dom";
import {
  showAlert,
  clearAlert,
} from "../redux/features/feedback/feedbackSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const RegisterPage = () => {
  const [values, setValues] = useState(initialState);

  const bg = mode("white", "gray.700");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, token } = useSelector((state) => state.user);
  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        showAlert({
          status: "error",
          description: "Please add all values",
        })
      );
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }

    const currentUser = { name, email, password };
    if (isMember) {
      dispatch(loginUser(currentUser));
    } else {
      dispatch(registerUser(currentUser));
    }
  };

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);
  return (
    <Container
      maxW="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      px={6}
    >
      <Box
        as="form"
        display="flex"
        flexDir="column"
        w="100vw"
        p={10}
        bg={bg}
        boxShadow="lg"
        borderTop="5px solid"
        borderTopColor={mode("red.500", "red.200")}
        borderTopRadius={5}
        textAlign="center"
        onSubmit={handleSubmit}
      >
        <Heading
          display="flex"
          mb={10}
          alignItems="end"
          justifyContent="center"
          gap={2}
        >
          <Logo />
          {values.isMember ? "Login" : "Register"}
        </Heading>
        {isShowAlert && <AlertPopUp {...alertDetails} />}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
            icon={<FaUserAlt />}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
          icon={<EmailIcon />}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
          icon={<LockIcon />}
          isPassword={true}
        />
        <Button
          colorScheme="red"
          type="submit"
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Text mt={10}>
          {values.isMember ? "Not a member yet? " : "Already a member?"}{" "}
          <Link
            onClick={toggleMember}
            color={mode("red.500", "red.200")}
            variant="unstyled"
          >
            {values.isMember ? " Register" : " Login"}
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default RegisterPage;
