import { Box } from "@chakra-ui/react";
import parse from "html-react-parser";

export default function ShowTextToHtml({ value }: { value: string }) {
  return <Box px={5}>{parse(value)}</Box>;
}
