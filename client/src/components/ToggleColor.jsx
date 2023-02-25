import { Box, useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux';
import { changeMode } from '../redux/features/user/userSlice';
const ToggleColor = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <IconButton icon={colorMode === 'dark' ? <SunIcon />: <MoonIcon /> } onClick={() => {
        toggleColorMode(dispatch(changeMode()))

      }}></IconButton>
    </Box>
  )
}

export default ToggleColor