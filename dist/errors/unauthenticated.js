import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";
class UnAuthenticatedError extends CustomAPIError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export default UnAuthenticatedError;
