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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, ReactNode } from "react";
import {
  FieldError,
  UseFormRegister,
  Path,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";

interface FormInputProps<TFormValues extends FieldValues> {
  type: string;
  name: Path<TFormValues>;
  labelText?: string;
  icon?: ReactNode;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<TFormValues>;
  validationRules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  isPassword?: boolean;
}

const FormInput = <TFormValues extends FieldValues>({
  type,
  name,
  labelText,
  icon,
  placeholder,
  error,
  register,
  validationRules = {},
  isPassword = false,
  ...props
}: FormInputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const bgColor = useColorModeValue("blue.50", "gray.700");

  return (
    <FormControl mb={{ base: 2, lg: 5 }} isInvalid={!!error}>
      <FormLabel opacity={0.8} fontWeight={400} fontSize={{ base: 12, lg: 14 }}>
        {labelText || name}
      </FormLabel>
      <InputGroup>
        {icon && <InputLeftElement>{icon}</InputLeftElement>}
        <Input
          {...props}
          {...register(name, validationRules)} // Register the input with react-hook-form
          opacity={0.9}
          type={showPassword ? "text" : isPassword ? "password" : type}
          name={name}
          fontSize={{ base: 11, lg: 14 }}
          focusBorderColor={useColorModeValue("red.500", "red.200")}
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
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
