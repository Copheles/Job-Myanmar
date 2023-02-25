import {
  UnAuthenticatedError
} from "../errors/index.js";


const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) {
    console.log('yes u can')
    return
  }
  console.log('no u cant')
  throw new UnAuthenticatedError('Not authorized to access this route')
}

const checkPostOwnerDeleteCmt = (requestUser, resourceUserId, postOwnerId) => {

  if (requestUser.userId === postOwnerId.toString()) {
    return

  } else if (requestUser.userId === resourceUserId.toString()) {
    return
  }

  throw new UnAuthenticatedError('Not authorized to acess this route')
}

export {
  checkPermissions,
  checkPostOwnerDeleteCmt
}