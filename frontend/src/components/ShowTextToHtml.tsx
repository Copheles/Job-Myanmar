import { Box } from "@chakra-ui/react";
import parse from "html-react-parser";

export default function ShowTextToHtml({ value }: { value: string }) {
  return <Box px={{ base: 4, md: 5}} fontSize={{ base: 12, md: 17}}>{parse(value)}</Box>;
}
