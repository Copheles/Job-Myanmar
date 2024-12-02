import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader || authHeader?.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        throw new UnAuthenticatedError("Authentication Invalid");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof payload !== "string" && payload.userId) {
            req.user = { userId: payload.userId };
        }
        else {
            throw new UnAuthenticatedError("Authentication Invalid");
        }
    }
    catch (error) {
        throw new UnAuthenticatedError("Authentication Invalid");
    }
    next();
};
export default auth;
