import { Box } from '@chakra-ui/react';
import parse from 'html-react-parser';
const ShowTextToHtml = ({ value }) => {
  return (
    <Box px={5}>
      {parse(value)}
    </Box>
  )
}

export default ShowTextToHtml