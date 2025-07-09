import {
  Box,
  FormLabel,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFormValues extends FieldValues> {
  labelText?: string;
  name: Path<TFormValues>;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<TFormValues>;
  validationRules?: RegisterOptions<TFormValues, Path<TFormValues>>;
}

export default function FormTextArea<TFormValues extends FieldValues>({
  labelText,
  name,
  placeholder,
  error,
  register,
  validationRules,
}: Props<TFormValues>) {
  const errorColor = useColorModeValue("red.600", "red.300");
  const bg = useColorModeValue("blue.50", "gray.700");
  return (
    <Box>
      {labelText && (
        <FormLabel fontSize={{ base: 12, lg: 14 }}>{labelText}</FormLabel>
      )}
      <Textarea
        placeholder={placeholder}
        {...register(name, validationRules)}
        fontSize={{ base: 11, lg: 14 }}
        focusBorderColor={useColorModeValue("red.500", "red.200")}
        name={name}
        isInvalid={!!error}
        bg={bg}
      />
      {error && (
        <Text color={errorColor} fontSize={14} mt={2}>
          {error.message}
        </Text>
      )}
    </Box>
  );
}
