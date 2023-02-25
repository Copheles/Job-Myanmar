import { Menu, MenuButton, MenuList, Box , MenuItem, Text} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BiLogOutCircle } from 'react-icons/bi'

const NavbarProfile = () => {

  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <Menu as={Box}>
      <MenuButton as={Box} px="4" py='2' transition="all 0.3s">
        Hello <ChevronDownIcon />
        <MenuList as={Box}>
          <MenuItem as={Box} onClick={handleLogout}>
            <BiLogOutCircle /> <Text  ml='2'>Logout</Text>
          </MenuItem>
        </MenuList>
      </MenuButton>
    </Menu>
  )
}

export default NavbarProfile