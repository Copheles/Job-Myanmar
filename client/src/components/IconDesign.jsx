import { Flex } from "@chakra-ui/react";
import React from "react";

const IconDesign = ({ label, icon }) => {
  
  return (
    <Flex alignItems="center" gap={{ base: 4, md: 3 }}>
      {icon}
      {label}
    </Flex>
  );
};

export default IconDesign;
