import { Request, Response, NextFunction } from 'express';

export const contentType = (_: Request, res: Response, next: NextFunction) => {
  res.contentType('json');

  next();
};
