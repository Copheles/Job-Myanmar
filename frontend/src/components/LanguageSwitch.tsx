import {
  VStack,
  Text,
  Divider,
  Flex,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { US, MM } from "country-flag-icons/react/3x2";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLanguage } from "@features/Landing/slice/languageSlice";
import useLanguage from "@hooks/useLanguage";

type Language = "en" | "mm";

const LanguageSwitch = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useAppSelector((state) => state.language);
  const { language } = useLanguage();
  const activeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const inactiveColor = useColorModeValue("gray.500", "gray.400");

  const languages = [
    { code: "en", name: "English", flag: US },
    { code: "mm", name: "မြန်မာ", flag: MM },
  ];

  return (
    <VStack spacing={4} align="stretch" w="full" mt={5}>
      <Text fontSize={{ base: 15, md: 20 }} fontWeight="semibold">
        {language.profilePage.languageHeader}
      </Text>
      <Text
        fontSize={{ base: 12, md: 15 }}
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {language.profilePage.selectLanguage}
      </Text>


      <VStack spacing={2}>
        {languages.map((lang) => (
          <Flex
            key={lang.code}
            w="full"
            p={3}
            borderRadius="md"
            align="center"
            justify="space-between"
            bg={currentLanguage === lang.code ? activeBg : "transparent"}
            color={currentLanguage === lang.code ? "current" : inactiveColor}
            cursor="pointer"
            onClick={() => dispatch(setLanguage(lang.code as Language))}
            _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.100") }}
          >
            <Flex align="center">
              <Box w="20px" h="20px" mr={3}>
                <lang.flag style={{ width: "100%", height: "100%" }} />
              </Box>
              <Text fontSize={{ base: 14, md: 16 }}>{lang.name}</Text>
            </Flex>
            {currentLanguage === lang.code && <CheckIcon color="green.500" />}
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default LanguageSwitch;
