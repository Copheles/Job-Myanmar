import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import FormRow from "@components/FormRow";
import { useForm } from "react-hook-form";
import SelectField from "@components/SelectField";
import FormTextArea from "@components/FormTextArea";
import RichTextEditor from "@components/RichTextEditor";
import {
  useCreateJobMutation,
  useGetSingleJobQuery,
  useUpdateJobMutation,
} from "@features/Main/AllJobs/slice/jobApiSlice";
import useCustomToast from "@hooks/useCustomToast";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLanguage from "@hooks/useLanguage";

interface FormValues {
  position: string;
  company: string;
  location: string;
  status: "interview" | "declined" | "pending";
  jobType: "full-time" | "part-time" | "remote" | "internship";
  aboutCompany: string;
  description: string;
}

export default function AddJobPage() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const id = searchParams.get("id");

  const { data } = useGetSingleJobQuery(id);

  const [isJobEditing] = useState(id !== null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      position: data?.job?.position || "",
      company: data?.job?.company || "",
      location: data?.job?.jobLocation || "",
      status: data?.job?.status || "pending",
      jobType: data?.job?.jobType || "full-time",
      aboutCompany: data?.job?.aboutCompany || "",
      description: data?.job?.jobDescription || "",
    },
  });

  const descriptionText = watch("description");
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const { customToast } = useCustomToast();

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const formatData = {
      position: data.position,
      company: data.company,
      aboutCompany: data.aboutCompany,
      jobLocation: data.location,
      jobType: data.jobType,
      status: data.status,
      jobDescription: data.description,
    };

    try {
      if (isJobEditing) {
        await updateJob({ jobId: id, data: formatData }).unwrap();
        customToast({
          title: "Update Job",
          description: "Successfully updated",
          status: "success",
        });
        navigate(`/jobs/${id}`);
      } else {
        await createJob(formatData).unwrap();
        customToast({
          title: "Add Job",
          description: "Successfully created",
          status: "success",
        });
        navigate("/");
      }
    } catch (error: any) {
      customToast({
        title: "Add Job",
        description: error?.data?.message || error.error,
        status: "error",
      });
    }
  };

  const handleClear = () => {
    reset();
    navigate(-1);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      px={{ base: 5, md: 10 }}
      py={10}
      pb="100px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading fontSize={{ base: "20px", md: "30px" }}>
        {isJobEditing
          ? language.editPage.editHeader
          : language.editPage.addHeader}
      </Heading>
      <SimpleGrid mt={10} columns={{ md: 2, lg: 3 }} gap={5}>
        <FormRow
          type="text"
          name="position"
          labelText={language.editPage.position}
          register={register}
          error={errors.position}
          validationRules={{
            required: "Position is required",
          }}
        />
        <FormRow
          type="text"
          name="company"
          labelText={language.editPage.company}
          register={register}
          error={errors.company}
          validationRules={{
            required: "Company name is required",
          }}
        />
        <FormRow
          type="text"
          name="location"
          labelText={language.editPage.location}
          register={register}
          error={errors.location}
          validationRules={{
            required: "Location is required",
          }}
        />
        <SelectField
          labelText={language.editPage.status}
          name="status"
          options={["pending", "interview", "declined"]}
          register={register}
        />
        <SelectField
          labelText={language.editPage.jobType}
          name="jobType"
          options={["full-time", "part-time", "remote", "internship"]}
          register={register}
        />
        <FormTextArea
          labelText={language.editPage.aboutCompany}
          name="aboutCompany"
          register={register}
          validationRules={{
            required: "About company is required",
          }}
          error={errors.aboutCompany}
        />
      </SimpleGrid>
      <RichTextEditor
        descriptionText={descriptionText}
        name="description"
        control={control}
      />
      <Flex gap={5}>
        <Button w="full" type="submit" colorScheme="red" fontSize={{ base: 12, md: 16}}>
          {isJobEditing ? language.editPage.editButton : language.editPage.submit}
        </Button>
        <Button w="full" onClick={handleClear} fontSize={{ base: 12, md: 16}}>
          { language.editPage.back}
        </Button>
      </Flex>
    </Box>
  );
}
