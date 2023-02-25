import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import RichTextEditor from "../../components/RichTextEditor";
import { useColorModeValue } from "@chakra-ui/react";
import FormRow from "../../components/FormRow";
import SelectField from "../../components/SelectField";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  showAlert,
} from "../../redux/features/feedback/feedbackSlice";
import AlertPopUp from "../../components/AlertPopUp";
import {
  clearJobInputFields,
  handleChangeInputJob,
} from "../../redux/features/job/jobSlice";
import { createJob, updateJob } from "../../redux/features/job/jobThunks";
import FormTextArea from "../../components/FormTextArea";

const AddJob = () => {
  const {
    statusOptions,
    jobTypeOptions,
    position,
    company,
    jobLocation,
    jobDescription,
    status,
    jobType,
    aboutCompany,
  } = useSelector((state) => state.job);

  const { isShowAlert, alertDetails } = useSelector((state) => state.feedback);
  const { isJobEditing, EditJobId } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation | jobDescription) {
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

    if (isJobEditing) {
      const updatedData = {
        position,
        company,
        jobLocation,
        status,
        jobType,
        jobDescription,
        aboutCompany,
      };
      dispatch(updateJob({ id: EditJobId, jobData: updatedData }));
    } else {
      dispatch(
        createJob({
          position,
          company,
          jobLocation,
          status,
          jobType,
          jobDescription,
          aboutCompany,
        })
      );
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    dispatch(handleChangeInputJob({ name, value }));
  };

  const handleClear = () => {
    dispatch(clearJobInputFields());
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      px={{ base: 5, md: 10 }}
      py={10}
      pb="100px"
    >
      <Heading fontSize={{ base: "20px", md: "30px" }}>
        {isJobEditing ? "Editing Job" : "Add Job"}
      </Heading>
      {isShowAlert && <AlertPopUp {...alertDetails} />}
      <SimpleGrid mt={10} columns={{ md: 2, lg: 3 }} gap={5}>
        <FormRow
          type="text"
          name="position"
          labelText="Position"
          value={position}
          handleChange={handleJobInput}
        />
        <FormRow
          type="text"
          name="company"
          labelText="Company"
          value={company}
          handleChange={handleJobInput}
        />
        <FormRow
          type="text"
          name="jobLocation"
          labelText="Location"
          value={jobLocation}
          handleChange={handleJobInput}
        />
        <SelectField
          labelText="Status"
          options={statusOptions}
          name="status"
          value={status}
          handleChange={handleJobInput}
        />
        <SelectField
          labelText="Job Type"
          options={jobTypeOptions}
          name="jobType"
          value={jobType}
          handleChange={handleJobInput}
        />
        <FormTextArea
          labelText="About Company"
          name="aboutCompany"
          value={aboutCompany}
          handleChange={handleJobInput}
        />
      </SimpleGrid>
      <RichTextEditor value={jobDescription} />
      {/* <RichTextEditor  />  */}
      <Box
        mb="100px"
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        gap={4}
      >
        <Button w="full" colorScheme="red" onClick={handleSubmit}>
          {isJobEditing ? "Update" : "Submit"}
        </Button>
        <Button w="full" colorScheme="gray" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default AddJob;
