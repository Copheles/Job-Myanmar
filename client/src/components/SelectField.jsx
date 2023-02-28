import React from "react";
import { Box, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";
const SelectField = ({ labelText, name, options, value, handleChange, icon, bg }) => {
  return (
    <Box>
      <FormLabel>{labelText}</FormLabel>
      <Select
        colorScheme="pink"
        borderColor={bg}
        focusBorderColor={useColorModeValue("red.500", "red.200")}
        mb={5}
        bg={useColorModeValue('red.50', 'gray.700')}
        value={value}
        onChange={handleChange}
        name={name}
        icon ={icon}
      >
        { options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectField;
