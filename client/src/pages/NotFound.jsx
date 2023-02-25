import React from 'react'
import notfounddark from '../assets/images/not_found_dark.svg'
import notfoundlight from '../assets/images/not_found_light.svg'
import { Link  as RLink} from 'react-router-dom'
import { Container, Heading, Text, useColorModeValue, Link, Image } from '@chakra-ui/react'

const NotFound = () => {
  const notFoundImg = useColorModeValue(notfoundlight, notfounddark)
  const textColor = useColorModeValue('pink.500' ,'pink.200')

  return (
    <Container textAlign="center" h="100vh" display="flex" maxW="xl" flexDir="column" justifyContent="center" alignItems="center" gap={4}>
      <Image src={notFoundImg} />
      <Heading>Ohh! page not found</Heading>
      <Text>We can't seem to find the page you're looking for</Text>
      <Link as={RLink} to="/" color={textColor}>back to home</Link>
    </Container>
  )
}

export default NotFound