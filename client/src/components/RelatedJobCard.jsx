import { Card, CardBody, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink, useNavigate} from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

const RelatedJobCard = ({ job }) => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/job/${job._id}`)
  }

  return (
    <Card mb={5} cursor="pointer" _hover={{ backgroundColor:useColorModeValue("gray.50", "gray.600") }} onClick={handleClick}> 
      <CardBody>
        <Flex alignItems='center' mb={5}>
          <Avatar
            name={job.company}
            bg={useColorModeValue("red.500", "red.200")}
            color="white"
          />
          <Link mx={5} as={ReactLink} to={`/job/${job._id}`}>
            {job.company}
          </Link>
        </Flex>
        <Link as={ReactLink} to={`/job/${job._id}`}>
        {job.position}
      </Link>
      </CardBody>
      
    </Card>
  );
};

export default RelatedJobCard;
