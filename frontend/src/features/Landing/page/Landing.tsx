import { Box, Button, Container, Heading, Text, Image } from "@chakra-ui/react";
import LandingImageLight from "@assets/images/undraw_interview_light.svg";
import LandingImageDark from "@assets/images/undraw_interview_dark.svg";
import { Link, useNavigate } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import Logo from "@components/Logo";
import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
import useLanguage from "@hooks/useLanguage";

const LandingPage = () => {
  const textColor = useColorModeValue("red.500", "red.200");
  const { language } = useLanguage();

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
        <LanguageSwitcher />
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
          <Heading mb={7} flexBasis="100%" fontSize={{ base: 16, md: 22}}>
            {language.landing.headerFront}
            <Text display="inline" color={textColor}>
              {" "}
              {language.landing.headerBack}
            </Text>
          </Heading>
          <Text mb={7} color="gray.500" fontSize={{ base: 13, md: 17}}>
            {language.landing.descriptionText}
          </Text>
          <Link to="/register">
            <Button px={5} colorScheme="red" fontSize={{ base: 12, md: 16 }}>
              {language.landing.accountRegisteringText}
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
