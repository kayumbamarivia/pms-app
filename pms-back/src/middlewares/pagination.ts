import { Request, Response, NextFunction } from 'express';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

declare global {
  namespace Express {
    interface Request {
      pagination?: PaginationOptions;
    }
  }
}

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { page = 1, limit = 10, sortBy, sortOrder = 'ASC' } = req.query;

  req.pagination = {
    page: Number(page),
    limit: Number(limit),
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'ASC' | 'DESC',
  };

  next();
}; 