import { Box, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <IconButton
        aria-label="dark-mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={() => {
          toggleColorMode();
        }}
      ></IconButton>
    </Box>
  );
};

export default ToggleColor;
