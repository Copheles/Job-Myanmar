import {
  Box,
  Flex,
  useColorModeValue as mode,
  SimpleGrid,
} from "@chakra-ui/react";

import SelectField from "@components/SelectField";
import { useAppSelector } from "@redux/hooks";
import { UseFormRegister } from "react-hook-form";
import { CgSortAz } from "react-icons/cg";
import { FormValues } from "../page/AllJobs";

export default function SearchContainer({
  register,
}: {
  register: UseFormRegister<FormValues>;
}) {
  const { sortOptions, statusOptions, jobTypeOptins } = useAppSelector(
    (state) => state.jobFilter
  );
  const bg = mode("white", "gray.700");

  return (
    <>
      <Box
        px={{ base: 2, md: 8 }}
        py={{ base: 3, md: 4 }}
        w="full"
        bg={bg}
        mb={10}
        borderRadius="10px"
      >
        <Flex justifyContent="space-between" flexDirection={"column"}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 2, md: 4, lg: 6 }}
          >
            <SelectField
              name="searchStatus"
              labelText="status"
              register={register}
              options={["all", ...statusOptions]}
            />
            <SelectField
              name="searchType"
              labelText="type"
              register={register}
              options={["all", ...jobTypeOptins]}
            />
            <SelectField
              name="sort"
              labelText="sort"
              options={["all", ...sortOptions]}
              register={register}
              icon={<CgSortAz />}
            />
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
}
