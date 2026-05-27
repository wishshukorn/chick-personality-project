/**
 * Validation Utilities
 * Common validation functions for data validation
 */

import { PersonalityTypeSlug, DeviceType, ScoreBreakdown, ScoringWeights } from '../types/entities';

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate HEX color format
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Validate share token format (32 alphanumeric characters)
 */
export function isValidShareToken(token: string): boolean {
  const tokenRegex = /^[a-zA-Z0-9]{32}$/;
  return tokenRegex.test(token);
}

/**
 * Validate IP hash format (64 hex characters)
 */
export function isValidIPHash(hash: string): boolean {
  const hashRegex = /^[a-f0-9]{64}$/;
  return hashRegex.test(hash);
}

/**
 * Validate session ID format (64 alphanumeric characters)
 */
export function isValidSessionId(sessionId: string): boolean {
  const sessionIdRegex = /^[a-zA-Z0-9]{64}$/;
  return sessionIdRegex.test(sessionId);
}

/**
 * Validate score breakdown
 */
export function isValidScoreBreakdown(breakdown: ScoreBreakdown): boolean {
  const slugs = Object.keys(breakdown);
  const totalPercentage = Object.values(breakdown).reduce((sum, item) => sum + item.percentage, 0);
  
  // Must have exactly 7 personality types
  if (slugs.length !== 7) return false;
  
  // Percentages must sum to 100% ± 1%
  if (totalPercentage < 99 || totalPercentage > 101) return false;
  
  // All percentages must be between 0 and 100
  for (const item of Object.values(breakdown)) {
    if (item.percentage < 0 || item.percentage > 100) return false;
  }
  
  return true;
}

/**
 * Validate scoring weights
 */
export function isValidScoringWeights(weights: ScoringWeights, activeTypes: PersonalityTypeSlug[]): boolean {
  const slugs = Object.keys(weights);
  
  // Must have all active personality types
  if (slugs.length !== activeTypes.length) return false;
  
  // All weights must be non-negative integers
  for (const weight of Object.values(weights)) {
    if (!Number.isInteger(weight) || weight < 0 || weight > 10) return false;
  }
  
  return true;
}

/**
 * Validate device type
 */
export function isValidDeviceType(deviceType: string): deviceType is DeviceType {
  return Object.values(DeviceType).includes(deviceType as DeviceType);
}

/**
 * Validate personality type slug
 */
export function isValidPersonalityTypeSlug(slug: string): slug is PersonalityTypeSlug {
  return Object.values(PersonalityTypeSlug).includes(slug as PersonalityTypeSlug);
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
