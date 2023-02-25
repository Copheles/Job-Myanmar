import React from 'react'
import { Alert, AlertIcon, AlertDescription} from '@chakra-ui/react'


const AlertPopUp = ({ status, description, variant}) => {
  return (
    <Alert status={status} variant={variant || 'subtle' } my={5}>
      <AlertIcon/>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default AlertPopUp