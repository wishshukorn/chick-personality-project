/**
 * UUID Utilities
 * UUID validation and generation helpers
 */

import crypto from 'crypto';

/**
 * Generate UUID v4 using crypto module
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Parse UUID string (throws if invalid)
 */
export function parseUUID(uuid: string): string {
  if (!isValidUUID(uuid)) {
    throw new Error(`Invalid UUID format: ${uuid}`);
  }
  return uuid;
}
