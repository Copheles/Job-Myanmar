import { useToast } from "@chakra-ui/react";

type CustomToastTypes = {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading";
};

export default function useCustomToast() {
  const toast = useToast();

  const customToast = ({ title, description, status }: CustomToastTypes) => {
    return toast({
      title,
      description,
      status,
      isClosable: true,
      position: "top-right",
      duration: 5000,
    });
  };

  return {
    customToast,
  };
}
