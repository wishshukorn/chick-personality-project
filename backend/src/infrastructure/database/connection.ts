/**
 * PostgreSQL Database Connection
 * Manages connection pool and provides query interface
 */

import { Pool, PoolConfig } from 'pg';
import config from '../config/env';
import { IDatabase } from '../../shared/interfaces/IDatabase';
import { AppError } from '../../shared/types/errors';

export class Database implements IDatabase {
  private pool: Pool;
  private isConnected: boolean = false;

  constructor() {
    const poolConfig: PoolConfig = {
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
      min: config.database.poolMin,
      max: config.database.poolMax,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

    this.pool = new Pool(poolConfig);

    this.pool.on('connect', () => {
      if (!this.isConnected) {
        this.isConnected = true;
        console.log('Database connected successfully');
      }
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected database error:', err);
      this.isConnected = false;
    });
  }

  async query<T>(query: string, params?: any[]): Promise<T> {
    try {
      const start = Date.now();
      const result = await this.pool.query(query, params || []);
      const duration = Date.now() - start;
      
      if (config.nodeEnv === 'development' && duration > 100) {
        console.log('Slow query detected:', { duration, query });
      }
      
      return result as T;
    } catch (error) {
      console.error('Database query error:', error);
      throw new AppError('Database query failed', 500);
    }
  }

  async getConnection(): Promise<any> {
    const client = await this.pool.connect();
    return client;
  }

  async close(): Promise<void> {
    try {
      await this.pool.end();
      this.isConnected = false;
      console.log('Database disconnected');
    } catch (error) {
      console.error('Database disconnection error:', error);
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.pool.query('SELECT NOW()', []);
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
    const client = await this.getConnection();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

// Singleton instance
let databaseInstance: Database | null = null;

export const getDatabase = (): Database => {
  if (!databaseInstance) {
    databaseInstance = new Database();
  }
  return databaseInstance;
};
