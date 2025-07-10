import {
  Box,
  Flex,
  useColorModeValue as mode,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import ProfileUpdate from "../components/ProfileUpdate";
import ChangePassword from "../components/ChangePassword";
import useLanguage from "@hooks/useLanguage";

export default function Profile() {
  const [, setActiveTab] = useState(0);

  const { language } = useLanguage();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  return (
    <Box bg={mode("white", "gray.700")} p={{ base: 3, md: 5 }}>
      <Flex
        justifyContent="space-evenly"
        gap={5}
        py={10}
        direction={{ base: "column-reverse", lg: "row" }}
      >
        <Box flex={1} mx={2} mb={{ base: 10, lg: 0 }}>
          <Tabs onChange={handleTabChange}>
            <TabList>
              <Tab fontSize={{ base: 12, md: 15 }}>
                {language.profilePage.profileTab}
              </Tab>
              <Tab fontSize={{ base: 12, md: 15 }}>
                {language.profilePage.settingTab}
              </Tab>
  
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProfileUpdate />
              </TabPanel>
              <TabPanel>
                <ChangePassword />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
}
