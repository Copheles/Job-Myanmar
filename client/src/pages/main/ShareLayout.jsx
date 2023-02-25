import { Box, Flex } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react"
import { BigSideBar } from "../../components/BigSideBar"
import { useDispatch } from 'react-redux';
import { clearJobInputFields, setFalseToJobEditingAndJobIdToNull } from "../../redux/features/job/jobSlice"
import { clearAlert } from "../../redux/features/feedback/feedbackSlice"


const ShareLayout = () => {
  const [ showSidebar, setShowSidebar ] = useState(true)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const location = useLocation()

  const dispatch = useDispatch();

  useEffect(() => {
    if(location.pathname !== '/add-job'){
      dispatch(clearAlert())
      dispatch(setFalseToJobEditingAndJobIdToNull())
      dispatch(clearJobInputFields())
    }
  }, [location, dispatch])


  return (
    <Box display="flex" flexDir="row">
      <BigSideBar showSidebar={showSidebar}/>
      <Flex direction="column" w="100%">
        <Navbar toggleSidebar={toggleSidebar}/>
        <Box px={{ base: 3, md: 10}} mt={{ base: 4, md: 8}} position="relative">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}

export default ShareLayout