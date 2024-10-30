import {
  Box,
  Button,
  Flex,
  useColorModeValue as mode,
  SimpleGrid,
} from "@chakra-ui/react";
import FormRow from "@components/FormRow";
import SelectField from "@components/SelectField";
import { useForm } from "react-hook-form";
import { CgSortAz } from "react-icons/cg";

interface FormValues {
  search?: string;
  searchStatus: string;
  searchType: string;
  sort: string;
}

export default function SearchContainer() {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });
  return (
    <Box
      px={{ base: 2, md: 8 }}
      py={{ base: 3, md: 4 }}
      w="full"
      bg={mode("white", "gray.700")}
      mb={10}
      borderRadius="10px"
    >
      <Flex alignItems="center" gap={{ base: 5, md: 6 }}>
        <FormRow
          type="text"
          name="search"
          labelText=""
          placeholder="Search"
          register={register}
          error={errors.search}
          validationRules={{
            required: "Search is required",
          }}
        />
        <Button
          mb={3}
          size={{ base: "sm", md: "md" }}
          type="submit"
          colorScheme="red"
          w={{ base: 20, lg: "full" }}
        >
          Search
        </Button>
      </Flex>
      <Flex justifyContent="space-between" flexDirection={"column"}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 2, md: 4, lg: 6 }}
        >
          <SelectField
            name="searchStatus"
            labelText="status"
            register={register}
            options={["all"]}
            validationRules={{
              required: "Search is required",
            }}
          />
          <SelectField
            name="searchType"
            labelText="type"
            register={register}
            validationRules={{
              required: "SearchType is required",
            }}
            options={["all"]}
          />
          <SelectField
            name="sort"
            labelText="sort"
            options={["all"]}
            register={register}
            validationRules={{
              required: "Sort is required",
            }}
            icon={<CgSortAz />}
          />
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
