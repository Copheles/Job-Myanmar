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
import Logo from "@components/Logo";

import { useEffect, useState } from "react";
import FormRow from "@components/FormRow";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "../slice/authApiSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setCrendials } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import useCustomToast from "@hooks/useCustomToast";

interface FormValues {
  name?: string;
  email: string;
  password: string;
}

const AuthPage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isMember, setIsMember] = useState(false);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const dispatch = useAppDispatch();
  const { customToast } = useCustomToast();
  const navigate = useNavigate();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const bg = mode("white", "gray.700");

  useEffect(() => {
    if (userInfo) {
      navigate("/jobs");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (data: FormValues) => {
    const { name, email, password } = data;
    try {
      let res;
      if (isMember) {
        res = await login({ email, password }).unwrap();
        dispatch(setCrendials({ ...res }));
      } else {
        res = await register({ email, name, password }).unwrap();
        dispatch(setCrendials({ ...res }));
      }
      customToast({
        title: isMember ? "Login" : "Register",
        description: `You are successfully ${
          isMember ? "Logged In" : "Registered"
        }`,
        status: "success",
      });
      navigate("/");
    } catch (error: any) {
      customToast({
        title: isMember ? "Login" : "Register",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
  };

  if (userInfo) {
    return null;
  }

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
        onSubmit={handleSubmit(submitHandler)}
      >
        <Heading
          display="flex"
          mb={10}
          alignItems="end"
          justifyContent="center"
          gap={2}
        >
          <Logo size="30px" />
          {isMember ? "Login" : "Register"}
        </Heading>

        {!isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="Name"
            register={registerForm}
            error={errors.name}
            validationRules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 15,
                message: "Name must be at most 15 character",
              },
            }}
            icon={<FaUserAlt />}
          />
        )}
        <FormRow
          type="email"
          name="email"
          register={registerForm}
          error={errors.email}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is invalid",
            },
          }}
          labelText="Email"
          icon={<EmailIcon />}
        />
        <FormRow
          type="password"
          name="password"
          register={registerForm}
          error={errors.password}
          validationRules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "Password must be at most 100 character",
            },
          }}
          labelText="Password"
          icon={<LockIcon />}
          isPassword={true}
        />
        <Button colorScheme="red" type="submit">
          Submit
        </Button>
        <Text mt={10}>
          {isMember ? "Not a member yet? " : "Already a member?"}{" "}
          <Link
            onClick={() => setIsMember(!isMember)}
            color={mode("red.500", "red.200")}
            variant="unstyled"
          >
            {isMember ? " Register" : " Login"}
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default AuthPage;
