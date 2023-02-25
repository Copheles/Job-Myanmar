import {
  Box,
  IconButton,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FaAlignLeft, FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const toggleIcon = useColorModeValue("red.500", "red.200");
  const bgColor = useColorModeValue("white", "gray.700");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const { name } = useSelector((state) => state.user.user);

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
        fontSize="30px"
        onClick={toggleSidebar}
        color={toggleIcon}
        icon={<FaAlignLeft />}
        bg="transparent"
        _hover={{ bg: "transparent" }}
      />
      <Text fontWeight="200" display={{ base: "none", md: "block" }}>
        Post your job to attract skilled talents...
      </Text>
      <Text fontWeight="200" display={{ base: "block", md: "none" }}>
        Jobs in Myanmar
      </Text>

      <Menu>
        <MenuButton
          size={{ base: "sm", lg: "md" }}
          as={Button}
          rightIcon={<ChevronDownIcon mb={1} />}
        >
          <Avatar size="xs" mr={2} /> {name}
        </MenuButton>
        <MenuList>
          <MenuItem minH="10px" onClick={() => navigate("/profile")}>
            <Flex justifyContent="space-between" alignItems="center" gap={3}>
              <FaUserCircle size={20} /> Profile
            </Flex>
          </MenuItem>
          <MenuItem minH="10px" onClick={handleLogout}>
            <Flex justifyContent="space-between" alignItems="center" gap={3}>
              <BiLogOutCircle size={20} /> Logout
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;
