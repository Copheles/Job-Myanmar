import CustomAPIError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
