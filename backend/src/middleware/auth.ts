import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader: any = req.headers.authorization;
  if (authHeader || authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof payload !== "string" && (payload as JwtPayload).userId) {
      req.user = { userId: (payload as JwtPayload).userId as string };
    } else {
      throw new UnAuthenticatedError("Authentication Invalid");
    }
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  next();
};

export default auth;
