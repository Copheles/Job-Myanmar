import links from "../utils/links";
import { NavLink as navlink } from "react-router-dom";
import { Link, Text, useColorModeValue } from "@chakra-ui/react";

const NavLinks = () => {
  const color = useColorModeValue('red.500', 'red.200')
  return (
    <>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        
        return (
          <Link
            as={navlink}
            to={path}
            key={id}
            display="flex"
            w="100%"
            gap={3}
            alignItems="center"
            fontSize={{ base: 25, md: 20}}
            my={{ base: 3, md: 0}}
            sx={{ fontWeight: 'lighter'}}
            _hover={{ marginLeft: '8px', transition: "0.3s ease-in-out all"}}
            _activeLink={{ color: `${color}`}}
          >
            {icon}
            <Text display={{ base: 'none', md: 'block'}}>{text}</Text>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
