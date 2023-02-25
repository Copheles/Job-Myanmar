import React from "react";
import { Box, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";

const SelectField = ({ labelText, name, options, value, handleChange }) => {
  return (
    <Box>
      <FormLabel>{labelText}</FormLabel>
      <Select
        colorScheme="pink"
        focusBorderColor={useColorModeValue("red.500", "red.200")}
        mb={5}
        bg={useColorModeValue('red.50', 'gray.700')}
        value={value}
        onChange={handleChange}
        name={name}
      >
        {/* <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
        { options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectField;
