import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import JobCard from "./JobCard";
import { useGetAllJobsQuery } from "../slice/jobApiSlice";
import JobCardSkeleton from "./JobCardSkeleton";
import Pagination from "@components/Pagination";
import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../slice/jobsFilterSlice";
import useLanguage from "@hooks/useLanguage";

interface Props {
  sort: string;
  status: string;
  jobType: string;
}

export default function JobsContainer({ sort, status, jobType }: Props) {
  const { page } = useAppSelector((state) => state.jobFilter);
  const { language } = useLanguage();
  const { data, isFetching } = useGetAllJobsQuery({
    sort,
    status,
    jobType,
    page,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
  }, [sort, status, jobType, dispatch]);

  return (
    <>
      <Heading mb={5} fontSize={{ base: "15px", md: "20px" }}>
        {data?.totalJobs} {data?.totalJobs === 1 ? language.allJobsText.job : language.allJobsText.jobs} {language.allJobsText.found}
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
        {isFetching
          ? Array.from({ length: 6 }).map((_, idx) => (
              <JobCardSkeleton key={idx} />
            ))
          : data?.jobs?.map((job: any) => <JobCard key={job._id} job={job} />)}
      </SimpleGrid>
      {data && data.numOfPages > 1 && (
        <Flex justifyContent="flex-end">
          <Pagination numOfPages={data?.numOfPages || 1} />
        </Flex>
      )}
    </>
  );
}
