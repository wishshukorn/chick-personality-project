/**
 * Request ID Middleware
 * Generates and attaches a unique request ID to each request for tracing
 */

import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

// Extend Express Request type to include id property
declare module 'express' {
  interface Request {
    id?: string;
  }
}
