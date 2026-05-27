/**
 * Database Interface
 * Defines database operations
 */

export interface IDatabase {
  /**
   * Execute a query
   * @param query - SQL query string
   * @param params - Query parameters
   * @returns Query result
   */
  query<T>(query: string, params?: any[]): Promise<T>;

  /**
   * Execute a transaction
   * @param callback - Transaction callback function
   * @returns Transaction result
   */
  transaction<T>(callback: (client: any) => Promise<T>): Promise<T>;

  /**
   * Get database connection
   * @returns Database client
   */
  getConnection(): any;

  /**
   * Close database connection
   * @returns void
   */
  close(): Promise<void>;

  /**
   * Check database health
   * @returns true if healthy, false otherwise
   */
  healthCheck(): Promise<boolean>;
}
