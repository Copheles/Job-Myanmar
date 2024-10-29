var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UnAuthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken';
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(' ')[1];
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
});
export default auth;
