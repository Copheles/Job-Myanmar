import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../redux/features/job/jobSlice";

const Pagination = () => {
  const { numOfPages, page } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const handleChangePage = (page) => {
    if (page < 1) page = 1;
    if (page > numOfPages) page = numOfPages;
    dispatch(changePage(page));
  };

  const renderPages = () => {
    let pages = [];
    if (page <= 4) {
      for (let i = 1; i <= Math.min(5, numOfPages); i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={i}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </Button>
        );
      }

      if (numOfPages > 5) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={"gray"}
            key="leftDots"
            onClick={() => handleChangePage(page + 5)}
          >
            ...
          </Button>
        );
      }

      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === numOfPages ? "red" : "gray"}
          key={numOfPages}
          onClick={() => handleChangePage(numOfPages)}
        >
          {numOfPages}
        </Button>
      );
    } else if (page > 4 && numOfPages - page > 3) {
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === 1 ? "red" : "gray"}
          key={1}
          onClick={() => handleChangePage(1)}
        >
          1
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={"gray"}
          key="leftDots"
          onClick={() => handleChangePage(page - 5)}
        >
          ...
        </Button>
      );

      for (let i = page - 1; i <= page + 1; i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={i}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </Button>
        );
      }
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={"gray"}
          key="rightDots"
          onClick={() => handleChangePage(page + 5)}
        >
          ...
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === numOfPages ? "red" : "gray"}
          key={numOfPages}
          onClick={() => handleChangePage(numOfPages)}
        >
          {numOfPages}
        </Button>
      );
    } else {
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === 1 ? "red" : "gray"}
          key={1}
          onClick={() => handleChangePage(1)}
        >
          1
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={"gray"}
          key="leftDots"
          onClick={() => handleChangePage(page - 5)}
        >
          ...
        </Button>
      );

      for (let i = numOfPages - 4; i <= numOfPages; i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={i}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <Flex my={10} gap={1}>
      {renderPages()}
    </Flex>
  );
};

export default Pagination;
