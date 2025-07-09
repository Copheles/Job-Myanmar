import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile, ImStatsBars } from "react-icons/im";
import { ReactNode } from "react";
import enTranslations from "@assets/locales/en.json";
import mmTranslations from "@assets/locales/mm.json";

type LinkItem = {
  id: number;
  text: string;
  path: string;
  icon: ReactNode;
};

import { NavLink as navlink } from "react-router-dom";
import { Link, Text, useColorModeValue } from "@chakra-ui/react";
import { useAppSelector } from "@redux/hooks";

const NavLinks = () => {
  const color = useColorModeValue("red.500", "red.200");
  const { currentLanguage } = useAppSelector((state) => state.language);
  const language = currentLanguage === "mm" ? mmTranslations : enTranslations;

  const links: LinkItem[] = [
    {
      id: 1,
      text: language.navigation.allJobs, // "All Jobs"
      path: "/jobs",
      icon: <MdQueryStats size={25} />,
    },
    {
      id: 2,
      text: language.navigation.stats, // "Stats"
      path: "stats",
      icon: <ImStatsBars size={25} />,
    },
    {
      id: 3,
      text: language.navigation.addJob, // "Add Job"
      path: "add-job",
      icon: <FaWpforms size={25} />,
    },
    {
      id: 4,
      text: language.navigation.profile, // "Profile"
      path: "profile",
      icon: <ImProfile size={25} />,
    },
  ];
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
            fontWeight="semibold"
            fontSize={{ base: 20, md: currentLanguage === "mm" ? 13 : 19 }}
            my={{ base: 3, md: 0 }}
            sx={{ fontWeight: "lighter" }}
            _hover={{ marginLeft: "8px", transition: "0.3s ease-in-out all" }}
            _activeLink={{ color: `${color}` }}
            end
          >
            {icon}
            <Text display={{ base: "none", md: "block" }}>{text}</Text>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
