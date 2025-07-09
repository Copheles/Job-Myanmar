import { Box, Button, Container, Heading, Text, Image } from "@chakra-ui/react";
import LandingImageLight from "@assets/images/undraw_interview_light.svg";
import LandingImageDark from "@assets/images/undraw_interview_dark.svg";
import { Link, useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import ToggleColor from "@components/ToggleColor";
import Logo from "@components/Logo";
import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";

const LandingPage = () => {
  const textColor = useColorModeValue("red.500", "red.200");
  const image = useColorModeValue(LandingImageLight, LandingImageDark);
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/jobs");
    }
  }, [userInfo, navigate]);

  if (userInfo) return null;

  return (
    <Container
      maxW="5xl"
      mx="auto"
      display="flex"
      flexDir="column"
      gap="80px"
      minH="100vh"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Logo size={"35px"} />
        <ToggleColor />
      </Box>

      <Box
        display="flex"
        flexDir="row"
        w="100%"
        h="80vh"
        alignItems="center"
        gap={3}
        justifyContent="space-between"
      >
        <Box py={4}>
          <Heading mb={7} flexBasis="100%">
            Tech Jobs
            <Text display="inline" color={textColor}>
              {" "}
              In Myanmar
            </Text>
          </Heading>
          <Text mb={7} color="gray.600">
            Job Myanmar is Myanmar's most widely used online professional job
            site and digital recruitment platform which effectively matched
            employers with the most suitable candidates to fill their jobs.
          </Text>
          <Link to="/register">
            <Button px={5} colorScheme="red">
              Login/Register
            </Button>
          </Link>
        </Box>
        <Box p={4} flexBasis="100%" display={{ base: "none", md: "block" }}>
          <Image src={image} alt="Landing Image" />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
