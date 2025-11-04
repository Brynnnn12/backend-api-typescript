import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/apiError';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/database';

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token');
    }

    try {
      const decoded = verifyToken(token);
      if (typeof decoded === 'string' || !decoded.id) {
        throw new ApiError(401, 'Invalid token');
      }
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      req.user = user;
      next();
    } catch {
      throw new ApiError(401, 'Not authorized, token failed');
    }
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, 'Not authorized to access this route');
    }
    next();
  };
};
