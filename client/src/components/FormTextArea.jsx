import { Box, Textarea, FormLabel, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const FormTextArea = ({
  value,
  placeholder,
  name,
  labelText,
  handleChange,
  size,
}) => {

  const bgColor = useColorModeValue("red.50", "gray.700");
  return (
    <Box>
      {labelText && <FormLabel>{labelText}</FormLabel>}
      <Textarea
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        focusBorderColor={useColorModeValue("red.500", "red.200")}
        bg={bgColor}

      />
    </Box>
  );
};

export default FormTextArea;
