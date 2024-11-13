import { Box } from "@chakra-ui/react";
import SearchContainer from "../components/SearchContainer";
import { useForm } from "react-hook-form";
import JobsContainer from "../components/JobsContainer";


export interface FormValues {
  searchStatus: string;
  searchType: string;
  sort: string;
}

export default function AllJobs() {
  const { register, watch } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      searchStatus: "all",
      searchType: "all",
      sort: "all",
    },
  });

  const [sort, status, jobType] = watch(["sort", "searchStatus", "searchType"]);
  

  return (
    <Box>
      <SearchContainer register={register} />

      <JobsContainer sort={sort} status={status} jobType={jobType} />
    </Box>
  );
}
