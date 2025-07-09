import { Box } from "@chakra-ui/react";
import SearchContainer from "../components/SearchContainer";
import { useForm } from "react-hook-form";
import JobsContainer from "../components/JobsContainer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export interface FormValues {
  searchStatus: string;
  searchType: string;
  sort: string;
}

export default function AllJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, watch } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      searchStatus: searchParams.get("status") || "all",
      searchType: searchParams.get("type") || "all",
      sort: searchParams.get("sort") || "all",
    },
  });

  const [sort, status, jobType] = watch(["sort", "searchStatus", "searchType"]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (jobType !== "all") params.set("type", jobType);
    if (sort !== "all") params.set("sort", sort);

    setSearchParams(params);
  }, [status, jobType, sort, setSearchParams]);

  return (
    <Box>
      <SearchContainer register={register} />

      <JobsContainer sort={sort} status={status} jobType={jobType} />
    </Box>
  );
}
