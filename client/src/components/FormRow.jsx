import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  InputGroup,
  FormLabel,
  InputLeftElement,
  useColorModeValue,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  icon,
  placeholder,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const bgColor = useColorModeValue("red.50", "gray.700");
  return (
    <FormControl mb={5}>
      <FormLabel>{labelText || name}</FormLabel>
      <InputGroup>
        {icon && <InputLeftElement children={icon} />}
        <Input
          type={showPassword ? "text" : isPassword ? "password" : type}
          name={name}
          onChange={handleChange}
          value={value}
          focusBorderColor={useColorModeValue("red.500", "red.200")}
          _autofill={false}
          bg={bgColor}
          placeholder={placeholder}
        />
        {isPassword && (
          <InputRightElement h="full">
            <Button
              variant="ghost"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default FormRow;
