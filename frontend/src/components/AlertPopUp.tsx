import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

type AlertPopUpProps = {
  status: "info" | "warning" | "success" | "error" | "loading";
  description: string;
  variant: string;
};

const AlertPopUp = ({ status, description, variant }: AlertPopUpProps) => {
  return (
    <Alert status={status} variant={variant || "subtle"} my={5}>
      <AlertIcon />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertPopUp;
