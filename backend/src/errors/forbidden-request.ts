import CustomAPIError from "./custom-api.js"
import { StatusCodes } from 'http-status-codes'

class ForbiddenRequestError extends CustomAPIError{
  public statusCode : number;
  constructor(message: string){
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
  
}

export default ForbiddenRequestError