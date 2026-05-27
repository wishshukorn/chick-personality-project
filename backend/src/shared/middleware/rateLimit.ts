/**
 * Rate Limiting Middleware
 * Configures rate limiting for different endpoint types
 */

import rateLimit from 'express-rate-limit';

// Global rate limit: 100 requests per minute per IP
export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Rate limit exceeded. Please try again later.',
    details: {
      limit: 100,
      window: '1 minute',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Test start rate limit: 10 requests per minute per IP
export const testStartRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Test start rate limit exceeded. Please try again later.',
    details: {
      limit: 10,
      window: '1 minute',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Answer submission rate limit: 60 requests per minute per IP
export const answerSubmissionRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Answer submission rate limit exceeded. Please try again later.',
    details: {
      limit: 60,
      window: '1 minute',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Share link creation rate limit: 10 requests per minute per IP
export const shareCreationRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Share link creation rate limit exceeded. Please try again later.',
    details: {
      limit: 10,
      window: '1 minute',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Image generation rate limit: 5 requests per minute per IP
export const imageGenerationRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Image generation rate limit exceeded. Please try again later.',
    details: {
      limit: 5,
      window: '1 minute',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
