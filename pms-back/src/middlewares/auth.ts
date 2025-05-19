import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.ts";
import { HistorySubscriber } from "../utils/HistorySubscriber.ts";
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.ts';
import { Role } from '../enums/Role.ts';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function JwtAuthenticater(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = verifyToken(token);
    HistorySubscriber.setCurrentUserEmail(payload.email);
    req.user = payload;
    res.on("finish", () => {
      HistorySubscriber.setCurrentUserEmail("");
    });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route', 401));
  }
};

export const restrictTo = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};