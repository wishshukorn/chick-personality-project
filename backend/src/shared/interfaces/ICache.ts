/**
 * Cache Interface
 * Defines caching operations
 */

export interface ICache {
  /**
   * Get value from cache
   * @param key - Cache key
   * @returns Cached value or null if not found
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set value in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttlSeconds - Time to live in seconds (optional)
   * @returns void
   */
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;

  /**
   * Delete value from cache
   * @param key - Cache key
   * @returns void
   */
  delete(key: string): Promise<void>;

  /**
   * Check if key exists in cache
   * @param key - Cache key
   * @returns true if key exists, false otherwise
   */
  exists(key: string): Promise<boolean>;

  /**
   * Clear all cache entries matching pattern
   * @param pattern - Key pattern (e.g., "user:*")
   * @returns void
   */
  clearPattern(pattern: string): Promise<void>;

  /**
   * Increment a counter in cache
   * @param key - Cache key
   * @param amount - Amount to increment (default: 1)
   * @returns New counter value
   */
  increment(key: string, amount?: number): Promise<number>;
}
