
import { Box, useColorModeValue } from "@chakra-ui/react";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ToggleColor from "./ToggleColor";


function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

export const BigSideBar = ({ showSidebar }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const [currentWidth, setCurrentWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      h="100vh"
      w={{ base: "52px", md: "250px" }}
      display="flex"
      alignItems="start"
      pl={{ base: 1, md: 10 }}
      flexDir="column"
      gap={20}
      justifyContent="space-between"
      position="sticky"
      top={0}
      transition="0.3s linear all"
      pb={10}
      marginLeft={`${
        showSidebar ? "0" : currentWidth > 768 ? "-250px" : "-52px"
      }`}
      bg={bgColor}
    >
      <Box>
        { currentWidth > 768 ? <Logo/> : null}
      </Box>


      <Box
        display="flex"
        flexDir="column"
        alignContent="space-between"
        gap={5}
        w="100%"
      >
        <NavLinks />
      </Box>

      <ToggleColor />
 
    </Box>
  );
};
