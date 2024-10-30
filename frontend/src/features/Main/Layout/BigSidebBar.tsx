import { Box, useColorModeValue } from "@chakra-ui/react";
import Logo from "@components/Logo";
import NavLinks from "./NavLinks";
import ToggleColor from "@components/ToggleColor";

type Props = {
  showSideBar: boolean
}

export default function BigSidebBar({ showSideBar}: Props) {
  return (
    <Box
      h="100vh"
      w={{ base: "50px", md: "250px" }}
      display="flex"
      flexDir="column"
      pl={{ base: 1, md: 10 }}
      gap={20}
      justifyContent="space-between"
      position="sticky"
      top={0}
      transition="0.3s linear all"
      pb={10}
      bgColor={useColorModeValue("white", "gray.700")}
      marginLeft={{ base: `${showSideBar ? '0': '-50px'}` , md: `${showSideBar ? '0': '-250px'}`}}
    >
      <Box visibility={{ base: 'hidden', md: 'visible'}}>
        <Logo size="30px" />  
      </Box>
      <Box
        display="flex"
        flexDir="column"
        alignContent="space-between"
        gap={5}
        w="full"
      >
        <NavLinks />
      </Box>

      <ToggleColor />
    </Box>
  );
}
