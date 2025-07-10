// components/LanguageSwitcher.tsx
import { ChevronDownIcon } from "@chakra-ui/icons";
import { US, MM } from "country-flag-icons/react/3x2";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  Text,
  Box,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLanguage } from "@features/Landing/slice/languageSlice";

type LanguageOption = {
  code: "en" | "mm";
  name: string;
  flag: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Language = "en" | "mm";


export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const languages = [
    { code: "en", name: "English", flag: US },
    { code: "mm", name: "မြန်မာ", flag: MM },
  ];

  const { currentLanguage } = useAppSelector((state) => state.language);

  const language = languages.find(
    (lang) => lang.code === currentLanguage
  ) as LanguageOption;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
        px={2}
      >
        <HStack spacing={2}>
          <Box w={6} h={6}>
            <language.flag style={{ width: "100%", height: "100%" }} />
          </Box>
          <Text fontSize="sm">{language?.name}</Text>
        </HStack>
      </MenuButton>
      <MenuList minW="120px" zIndex="dropdown">
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => dispatch(setLanguage(lang.code as Language))}
            icon={
              <Box w={5} h={5}>
                <lang.flag style={{ width: "100%", height: "100%" }} />
              </Box>
            }
          >
            {lang.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
