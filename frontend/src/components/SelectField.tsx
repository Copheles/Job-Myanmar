import { Box, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface FormSelectProps<TFormValues extends FieldValues> {
  labelText?: string;
  name: Path<TFormValues>;
  icon?: ReactElement;
  options: string[];
  register: UseFormRegister<TFormValues>;
  validationRules?: RegisterOptions<TFormValues, Path<TFormValues>>;
}
export default function SelectField<TFormValues extends FieldValues>({
  labelText,
  name,
  options,
  register,
  validationRules = {},
  icon,
}: FormSelectProps<TFormValues>) {
  return (
    <Box>
      <FormLabel>{labelText}</FormLabel>
      <Select
        colorScheme="pink"
        {...register(name, validationRules)}
        focusBorderColor={useColorModeValue("red.500", "red.200")}
        mb={5}
        bg={useColorModeValue("gray.200", "gray.700")}
        name={name}
        icon={icon}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
}
