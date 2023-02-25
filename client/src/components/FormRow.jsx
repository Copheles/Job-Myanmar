import { FormControl, Input, InputGroup, FormLabel, InputLeftElement, useColorModeValue } from "@chakra-ui/react";

const FormRow = ({ type, name, value, handleChange, labelText, icon, placeholder }) => {
  const bgColor = useColorModeValue('red.50', 'gray.700')
  return (
    <FormControl mb={5}>
      <FormLabel>{labelText || name}</FormLabel>
      <InputGroup>
        {icon && <InputLeftElement children={icon} />}
        <Input type={type} name={name} onChange={handleChange} value={value} focusBorderColor={useColorModeValue("red.500", "red.200")} bg={bgColor} placeholder={placeholder}/>
      </InputGroup>
    </FormControl>
  );
};

export default FormRow;
