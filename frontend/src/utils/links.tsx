import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile, ImStatsBars } from "react-icons/im";
import { ReactNode } from "react";

type LinkItem = {
  id: number;
  text: string;
  path: string;
  icon: ReactNode; 
};

const links: LinkItem[] = [
  {
    id: 1,
    text: "all jobs",
    path: "/",
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: "stats",
    path: "stats",
    icon: <ImStatsBars />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
