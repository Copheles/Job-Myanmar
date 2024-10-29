import CustomAPIError from "./custom-api.js"
import { StatusCodes } from 'http-status-codes'

class BadRequestError extends CustomAPIError{
  public statusCode : number;
  constructor(message: string){
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
  
}

export default BadRequestError