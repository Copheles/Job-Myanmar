import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../redux/features/job/jobSlice";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const [inputPage, setInputPage] = useState("");
  const { numOfPages, page } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const invalidInput = ["e", "E", "+", "-", "."];

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  const GotoPage = () => {
    if (inputPage > numOfPages) {
      navigate("/page=undefined");
    }
    dispatch(changePage(inputPage));
  };

  return (
    <Box mt={5} mb={10}>
      <Heading fontWeight="thin" fontSize={{ base: "18px", lg: "20px" }}>
        {page} of {numOfPages} pages
      </Heading>
      <Flex gap={2} mt={5} alignItems="center">
        <Button
          colorScheme="red"
          variant="outline"
          onClick={prevPage}
          size={{ base: "xs", lg: "sm" }}
        >
          <BiSkipPrevious />
        </Button>
        <Button colorScheme="red" size={{ base: "xs", lg: "sm" }}>
          {page}
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={nextPage}
          size={{ base: "xs", lg: "sm" }}
        >
          <BiSkipNext />
        </Button>
        <Flex alignItems="center">
          <Input
            type="number"
            w="100px"
            focusBorderColor={useColorModeValue("red.500", "red.200")}
            bg={useColorModeValue("red.50", "gray.700")}
            value={inputPage}
            placeholder="Go to"
            onKeyDown={(e) =>
              invalidInput.includes(e.key) && e.preventDefault()
            }
            size={{ base: "xs", lg: "sm" }}
            onChange={(e) => setInputPage(e.target.value)}
          />
          <Button
            mx={2}
            colorScheme="red"
            onClick={GotoPage}
            size={{ base: "xs", lg: "sm" }}
          >
            Go to
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Pagination;
