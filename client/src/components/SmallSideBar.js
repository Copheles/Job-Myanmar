import { Box } from "@chakra-ui/react";
import React from "react";
import NavLinks from "./NavLinks";
import ToggleColor from "./ToggleColor";

const SmallSideBar = ({ showSideBar }) => {
  return (
    <Box display={{ base: "flex", md: "none" }} h="100vh" flexDir="column">
      <Box></Box>
      <Box display="flex" flexDir="column">
        <NavLinks />
      </Box>
      <ToggleColor/>
    </Box>
  );
};

export default SmallSideBar;
