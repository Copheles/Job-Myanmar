import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import FormRow from "./FormRow";
import SelectField from "./SelectField";
import { useDispatch, useSelector } from "react-redux";
import { Search2Icon } from "@chakra-ui/icons";
import {
  clearFilter,
  handleChangeFilterInput,
  searching,
} from "../redux/features/job/jobSlice";

const SearchContainer = () => {
  const {
    statusOptions,
    jobTypeOptions,
    sortOptions,
    searchStatus,
    searchType,
    sort,
    search,
    isLoading,
  } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };
  const handleSearch = (e) => {
    console.log(e.target.name)
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeFilterInput({ name, value }));
  };

  const searchJobs = (e) => {
    e.preventDefault()
    dispatch(searching(search))
  }

  return (
    <Box
      px={8}
      py={4}
      w="full"
      bg={useColorModeValue("white", "gray.700")}
      mb={10}
      border
      borderRadius="10px"
    >
      <Flex alignItems="center" gap={4} as='form' onSubmit={searchJobs}>
        <FormRow
          icon={<Search2Icon />}
          type="text"
          name='search'
          labelText=' '
          placeholder="Search"
          value={search}
          handleChange={handleSearch}
        />
        <Button mb={3} type='submit' colorScheme="red" >
          Search
        </Button>
      </Flex>
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <SimpleGrid columns={{ base: 1, md: 3}} gap={{ base: 2, md: 4, lg: 6 }}>
          <SelectField
            value={searchStatus}
            name="searchStatus"
            handleChange={handleSearch}
            labelText="status"
            options={["all", ...statusOptions]}
          />
          <SelectField
            value={searchType}
            name="searchType"
            handleChange={handleSearch}
            labelText="type"
            options={["all", ...jobTypeOptions]}
          />
          <SelectField
            value={sort}
            name="sort"
            handleChange={handleSearch}
            labelText="sort"
            options={sortOptions}
          />
        </SimpleGrid>
        <Button
          mt={2}
          variant="ghost"
          colorScheme="red"
          onClick={handleClearFilter}
        >
          Clear All
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchContainer;
