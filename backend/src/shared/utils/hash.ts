/**
 * Hash Utilities
 * Cryptographic hashing functions for data security
 */

import crypto from 'crypto';

/**
 * Generate SHA-256 hash of a string
 */
export function sha256Hash(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Generate cryptographically random token
 */
export function generateRandomToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate session ID (64 characters)
 */
export function generateSessionId(): string {
  return generateRandomToken(64);
}

/**
 * Generate share token (32 characters)
 */
export function generateShareToken(): string {
  return generateRandomToken(32);
}
