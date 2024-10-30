import { Box, Flex } from "@chakra-ui/react";
import BigSidebBar from "./BigSidebBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

export default function ShareLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Box display="flex" flexDir="row">
      <BigSidebBar showSideBar={showSidebar} />
      <Flex direction="column" w="full">
        <Navbar toggleSidebar={toggleSidebar} />
        <Box
          px={{ base: 3, md: 10 }}
          mt={{ base: 4, md: 8 }}
          position="relative"
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
