import jwt from "jsonwebtoken";
import { Response } from "express";

const isValidToken = ({ token }: { token: string }) =>
  jwt.verify(token, process.env.JWT_SECRET as string);

const attacthCookieToResponse = ({
  res,
  token,
}: {
  res: Response;
  token: string;
}) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export { isValidToken, attacthCookieToResponse };
