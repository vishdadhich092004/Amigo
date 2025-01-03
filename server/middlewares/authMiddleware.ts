import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface JWTUser {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
      };
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized, No token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JWTUser;
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: "Forbidden, Invalid Token" });
  }
};