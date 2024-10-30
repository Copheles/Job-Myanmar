import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { LockIcon } from "@chakra-ui/icons";
import FormRow from "@components/FormRow";
import { FieldValues, useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@features/Auth/slice/authApiSlice";
import useCustomToast from "@hooks/useCustomToast";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const [changePassword] = useChangePasswordMutation();

  const { customToast } = useCustomToast();

  const handleChangePassword = async (data: FieldValues) => {
    try {
      await changePassword(data).unwrap();

      customToast({
        title: "Change Password",
        description: "Change Password successfully",
        status: "success",
      });
    } catch (error: any) {
      console.log(error);
      customToast({
        title: "Change Password",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
    reset();
  };
  const newPassword = watch("newPassword");

  return (
    <Flex justifyContent={"flex-start"}>
      <Box maxW="3xl" pl={{ base: 0, lg: 10 }} w={"full"}>
        <Heading mt={5} mb={2} fontSize={{ base: 20 }}>
          Change Password
        </Heading>
        <Divider />

        <SimpleGrid
          mt={10}
          columns={{ base: 1, md: 2 }}
          gap={3}
          as="form"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <FormRow
            type="password"
            name="oldPassword"
            icon={<LockIcon />}
            labelText="Old password"
            register={register}
            error={errors.oldPassword}
            validationRules={{
              required: "Old Password is required",
              minLength: {
                value: 6,
                message: "Old Password must be at least 5 characters",
              },
              maxLength: {
                value: 100,
                message: "Old Password must be at most 100 character",
              },
            }}
            isPassword={true}
          />
          <FormRow
            type="password"
            name="newPassword"
            icon={<LockIcon />}
            labelText="New password"
            register={register}
            error={errors.newPassword}
            validationRules={{
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "New Password must be at least 5 characters",
              },
              maxLength: {
                value: 100,
                message: "New Password must be at most 100 character",
              },
            }}
            isPassword={true}
          />
          <FormRow
            type="password"
            name="confirmNewPassword"
            icon={<LockIcon />}
            labelText="Confirm new password"
            register={register}
            error={errors.confirmNewPassword}
            validationRules={{
              required: "Confirm New Password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
              minLength: {
                value: 6,
                message: "Confirm New Password must be at least 5 characters",
              },
              maxLength: {
                value: 100,
                message: "Confirm New Password must be at most 100 character",
              },
            }}
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
      </Box>
    </Flex>
  );
};

export default ChangePassword;
