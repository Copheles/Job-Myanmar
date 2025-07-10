import {
  VStack,
  Text,
  useColorMode,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, CheckIcon } from "@chakra-ui/icons";
import useLanguage from "@hooks/useLanguage";

const ThemeSwitcher = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { language } = useLanguage();
  const activeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const inactiveColor = useColorModeValue("gray.500", "gray.400");

  return (
    <VStack spacing={4} align="stretch" w="full">
      <Text fontSize={{ base: 15, md: 20 }} fontWeight="semibold" mt={5}>
        {language.profilePage.themeHeader}
      </Text>
      <Text fontSize={{ base: 12, md: 15 }} color={useColorModeValue("gray.600", "gray.400")}>
        {language.profilePage.themeDescription}
      </Text>

      <VStack spacing={2}>
        {/* Light Mode Option */}
        <Flex
          w="full"
          p={3}
          borderRadius="md"
          align="center"
          justify="space-between"
          bg={colorMode === "light" ? activeBg : "transparent"}
          color={colorMode === "light" ? "current" : inactiveColor}
          cursor="pointer"
          onClick={() => setColorMode("light")}
          _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
        >
          <Flex align="center">
            <Icon as={SunIcon} mr={3} />
            <Text fontSize={{ base: 14, md: 16}}>{language.profilePage.lightMode}</Text>
          </Flex>
          {colorMode === "light" && <CheckIcon color="green.500" />}
        </Flex>

        {/* Dark Mode Option */}
        <Flex
          w="full"
          p={3}
          borderRadius="md"
          align="center"
          justify="space-between"
          bg={colorMode === "dark" ? activeBg : "transparent"}
          color={colorMode === "dark" ? "current" : inactiveColor}
          cursor="pointer"
          onClick={() => setColorMode("dark")}
          _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
        >
          <Flex align="center">
            <Icon as={MoonIcon} mr={3} />
            <Text fontSize={{ base: 14, md: 16}}>{language.profilePage.darkMode}</Text>
          </Flex>
          {colorMode === "dark" && <CheckIcon color="green.500" />}
        </Flex>
      </VStack>
    </VStack>
  );
};

export default ThemeSwitcher;
