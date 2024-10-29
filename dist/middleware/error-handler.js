import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again later",
    };
    if (err.name === "ValidationError" && err.errors) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    }
    if (err.code === 11000 && err.keyValue) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    res.status(defaultError.statusCode).json({
        message: defaultError.message,
    });
};
export default errorHandlerMiddleware;
