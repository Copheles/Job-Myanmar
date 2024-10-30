import jwt from "jsonwebtoken";
const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);
const attacthCookieToResponse = ({ res, token, }) => {
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
export { isValidToken, attacthCookieToResponse };
