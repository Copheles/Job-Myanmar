import { Button, Flex } from "@chakra-ui/react";
import { setPage } from "@features/Main/AllJobs/slice/jobsFilterSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

type Props = {
  numOfPages: number;
};

export default function Pagination({ numOfPages }: Props) {
  const { page } = useAppSelector((state) => state.jobFilter);
  const dispatch = useAppDispatch();

  const handleChangePage = (num: number) => {
    dispatch(setPage(num));
  };

  const renderPages = () => {
    const pages: JSX.Element[] = [];

    // If we are at the beginning of the pagination
    if (numOfPages < 7) {
      for (let i = 1; i <= numOfPages; i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={`page-${i}`} // Ensure a unique key for each page
            onClick={() => handleChangePage(i)}
          >
            {i}
          </Button>
        );
      }
    } else if (page <= 4) {
      for (let i = 1; i <= Math.min(5, numOfPages); i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={`page-${i}`} // Ensure a unique key for each page
            onClick={() => handleChangePage(i)}
          >
            {i}
          </Button>
        );
      }

      if (numOfPages > 7) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={"gray"}
            key={`leftDots-1`} // Unique key
            onClick={() => handleChangePage(page + 5)}
          >
            ...
          </Button>
        );
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === numOfPages ? "red" : "gray"}
            key={`page-${numOfPages}`} // Ensure a unique key
            onClick={() => handleChangePage(numOfPages)}
          >
            {numOfPages}
          </Button>
        );
      }

      // If we are in the middle of the pagination
    } else if (page > 4 && numOfPages - page > 3) {
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === 1 ? "red" : "gray"}
          key={`page-1`} // Unique key
          onClick={() => handleChangePage(1)}
        >
          1
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={"gray"}
          key={`leftDots-${page}`} // Unique key
          onClick={() => handleChangePage(page - 5 <= 0 ? 1 : page - 5)}
        >
          ...
        </Button>
      );

      for (let i = page - 1; i <= page + 1; i++) {
        pages.push(
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme={page === i ? "red" : "gray"}
            key={`page-${i}`} // Ensure a unique key
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
          key={`rightDots-${page}`} // Unique key
          onClick={() => handleChangePage(page + 5 > numOfPages ? numOfPages : page + 5)}
        >
          ...
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === numOfPages ? "red" : "gray"}
          key={`page-${numOfPages}`} // Ensure a unique key
          onClick={() => handleChangePage(numOfPages)}
        >
          {numOfPages}
        </Button>
      );

      // If we are at the end of the pagination
    } else {
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={page === 1 ? "red" : "gray"}
          key={`page-1`} // Unique key
          onClick={() => handleChangePage(1)}
        >
          1
        </Button>
      );
      pages.push(
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme={"gray"}
          key={`leftDots-${page}`} // Unique key
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
            key={`page-${i}`} // Ensure a unique key
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
}
