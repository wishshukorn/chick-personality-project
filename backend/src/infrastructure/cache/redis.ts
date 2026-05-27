/**
 * Redis Cache Implementation
 * Manages Redis connection and cache operations
 */

import { createClient, RedisClientType } from 'redis';
import config from '../config/env';
import { ICache } from '../../shared/interfaces/ICache';
import { AppError } from '../../shared/types/errors';

export class RedisCache implements ICache {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port,
      },
      password: config.redis.password || undefined,
      database: config.redis.db,
    });

    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('Redis connected successfully');
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
      this.isConnected = false;
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('Redis connection verified');
    } catch (error) {
      console.error('Redis connection failed:', error);
      // Redis is optional, don't throw error
      this.isConnected = false;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      this.isConnected = false;
      console.log('Redis disconnected');
    } catch (error) {
      console.error('Redis disconnection error:', error);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isConnected) {
      return null;
    }
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    try {
      if (ttl) {
        await this.client.setEx(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Redis delete error:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    try {
      await this.client.expire(key, seconds);
    } catch (error) {
      console.error('Redis expire error:', error);
    }
  }

  async flush(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    try {
      await this.client.flushDb();
    } catch (error) {
      console.error('Redis flush error:', error);
    }
  }

  isConnectedToCache(): boolean {
    return this.isConnected;
  }
}

// Singleton instance
let redisInstance: RedisCache | null = null;

export const getRedisCache = (): RedisCache => {
  if (!redisInstance) {
    redisInstance = new RedisCache();
  }
  return redisInstance;
};
