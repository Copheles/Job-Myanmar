import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  label: string;
  icon: ReactNode;
};

export default function IconDesign({ label, icon }: Props) {
  return (
    <Flex alignItems="center" gap={{ base: 4, md: 3 }} fontSize={{ base: 12, md: 15}}>
      {icon}
      {label}
    </Flex>
  );
}
