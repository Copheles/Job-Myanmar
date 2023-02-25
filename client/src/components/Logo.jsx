import { Box,Image } from "@chakra-ui/react";
import logoLight from "../assets/images/logoLight.svg";
import logoDark from "../assets/images/logoDark.svg"
import { useColorModeValue } from "@chakra-ui/react";

const Logo = ({ size }) => {
  const logo = useColorModeValue(logoLight, logoDark)
  return (
    <Box display="flex" alignItems="center" mt="20px" justifyContent="space-between">
     <Image src={logo} fontSize={size} color="pink.500"/>
     
    </Box>
  )
};

export default Logo;
