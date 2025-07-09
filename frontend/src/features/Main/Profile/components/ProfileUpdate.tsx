import { EmailIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue as mode,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@features/Auth/slice/authApiSlice";
import moment from "moment";
import FormRow from "@components/FormRow";
import { FieldValues, useForm } from "react-hook-form";
import { FaLocationArrow, FaUserAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import useCustomToast from "@hooks/useCustomToast";
import { setCrendials } from "@features/Auth/slice/authSlice";
import useLanguage from "@hooks/useLanguage";

interface IUserUpdate {
  email: string;
  name: string;
  location: string;
}

export default function ProfileUpdate() {
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data: profile } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();

  const date = moment(profile?.user?.createdAt).format("MMM Do, YYYY");
  const { language } = useLanguage();
  const { customToast } = useCustomToast();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>({
    mode: "onTouched",
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      location: userInfo?.location,
    },
  });

  const submitHandler = async (data: FieldValues) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setCrendials({ ...res }));
      customToast({
        title: "Update Profile",
        description: "Updated Profile successfully",
        status: "success",
      });
    } catch (error: any) {
      console.log(error);
      customToast({
        title: "Update Profile",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
  };

  return (
    <Flex
      justifyContent={{ base: "center", lg: "flex-start" }}
      flexDir={{ base: "column", lg: "row" }}
      py={{ base: 3, lg: 10 }}
      maxW="5xl"
    >
      <Flex
        flexDirection="column"
        px={{ base: 10, lg: 2 }}
        w={{ base: "100%", lg: "30%" }}
        mb={{ base: 10, lg: 0 }}
      >
        <Box textAlign="center" mb={5}>
          <Avatar size="lg" alignItems="center" mb={5} />
          <Heading textAlign="center" fontSize={{ base: 20, md: 24 }} mb={3}>
            {profile?.user?.name}
          </Heading>
          <Heading
            fontSize={{ base: "10px" }}
            textAlign="center"
            color={mode("gray.500", "gray.500")}
          >
            {language.profilePage.joined} {date}
          </Heading>
        </Box>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={3}
        mb={{ base: 5, lg: 0 }}
        flex={1}
        as="form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <FormRow
          type="text"
          name="name"
          register={register}
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
          labelText={language.authFormLabel.name}
        />
        <FormRow
          type="email"
          name="email"
          register={register}
          error={errors.email}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is invalid",
            },
          }}
          labelText={language.authFormLabel.email}
          icon={<EmailIcon />}
        />
        <FormRow
          type="text"
          name="location"
          register={register}
          error={errors.location}
          validationRules={{
            required: "Location is required",
          }}
          labelText={language.profilePage.location}
          icon={<FaLocationArrow />}
        />

        <Button
          w="full"
          colorScheme="red"
          mt={{ base: 0, md: 8 }}
          mb={5}
          type="submit"
          fontSize={{ base: 12, md: 16 }}
        >
          {language.profilePage.saveBtn}
        </Button>
      </SimpleGrid>
    </Flex>
  );
}
