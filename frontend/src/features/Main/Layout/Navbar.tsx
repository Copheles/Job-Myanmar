import {
  Box,
  IconButton,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { FaAlignLeft, FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@redux/hooks";
import { useLogoutMutation } from "@features/Auth/slice/authApiSlice";
import { logout } from "@features/Auth/slice/authSlice";
import useLanguage from "@hooks/useLanguage";

type Props = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: Props) => {
  const toggleIcon = useColorModeValue("red.500", "red.200");
  const bgColor = useColorModeValue("white", "gray.700");
  const { language } = useLanguage();
  const [logOut] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logOut({}).unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: 2, md: 10 }}
      py={6}
      sx={{ transition: "0.5s ease-in-out all" }}
      bg={bgColor}
      position="sticky"
      top={0}
      zIndex={9}
    >
      <IconButton
        aria-label="toggle-btn"
        fontSize="30px"
        onClick={toggleSidebar}
        color={toggleIcon}
        icon={<FaAlignLeft />}
        bg="transparent"
        _hover={{ bg: "transparent" }}
      />
      <Text fontWeight="200" display={{ base: "none", md: "block" }}>
        {language.jobPosting.desktopText}
      </Text>
      <Text fontWeight="200" display={{ base: "block", md: "none" }}>
        {language.jobPosting.mobileText}
      </Text>
      <Menu>
        <Avatar as={MenuButton} size="sm" mr={2} border="1px solid" />

        <MenuList>
          <MenuItem
            minH="10px"
            onClick={() => navigate("/jobs/profile")}
            fontSize={{ base: 12, md: 16 }}
          >
            <Flex justifyContent="space-between" alignItems="center" gap={3}>
              <FaUserCircle size={20} /> {language.avatarDropDownText.profile}
            </Flex>
          </MenuItem>
          <MenuItem
            minH="10px"
            onClick={handleLogout}
            fontSize={{ base: 12, md: 16 }}
          >
            <Flex justifyContent="space-between" alignItems="center" gap={3}>
              <BiLogOutCircle size={20} /> {language.avatarDropDownText.logout}
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;
