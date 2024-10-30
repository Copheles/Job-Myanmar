import {

  Box,

  Flex,

  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,

  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getJobsByUser } from "../../redux/features/job/jobThunks";
import ProfileUpdate from "../../components/ProfileUpdate";
import ChangePassword from "../../components/ChangePassword";
import { clearAlert } from "../../redux/features/feedback/feedbackSlice";

const Profile = () => {
  
  const [, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  

  const { user } = useSelector((state) => state.user);

  const { _id } = user;


  useEffect(() => {
    dispatch(getJobsByUser(_id));
  }, [_id, dispatch]);

  
  const handleTabChange = (index) => {
    setActiveTab(index)
    dispatch(clearAlert())
  }

  

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
              <Tab>Profile</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProfileUpdate/>
              </TabPanel>
              <TabPanel>
                <ChangePassword/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
