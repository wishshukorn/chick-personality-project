/**
 * Environment Configuration
 * Loads and validates environment variables
 */

import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiVersion: string;
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    ssl: boolean;
    poolMin: number;
    poolMax: number;
  };
  redis: {
    host: string;
    port: number;
    password: string;
    db: number;
  };
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    s3Bucket: string;
    s3Prefix: string;
  };
  security: {
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
    rateLimitTestStart: number;
    rateLimitAnswerSubmit: number;
    rateLimitShareCreate: number;
    rateLimitImageGenerate: number;
  };
  cors: {
    origin: string;
  };
  logging: {
    level: string;
    file: string;
  };
  analytics: {
    enabled: boolean;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'chickpersonality',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl: process.env.DB_SSL === 'true',
    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
    s3Prefix: process.env.AWS_S3_PREFIX || 'share-cards/',
  },
  security: {
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    rateLimitTestStart: parseInt(process.env.RATE_LIMIT_TEST_START || '10', 10),
    rateLimitAnswerSubmit: parseInt(process.env.RATE_LIMIT_ANSWER_SUBMIT || '60', 10),
    rateLimitShareCreate: parseInt(process.env.RATE_LIMIT_SHARE_CREATE || '10', 10),
    rateLimitImageGenerate: parseInt(process.env.RATE_LIMIT_IMAGE_GENERATE || '5', 10),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log',
  },
  analytics: {
    enabled: process.env.ANALYTICS_ENABLED === 'true',
  },
};

export default config;
