/**
 * Application Entry Point
 * Sets up Express application with all middleware and routes
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createRoutes } from './routes';
import { QuestionController } from './controllers/QuestionController';
import { ResultController } from './controllers/ResultController';
import { ShareController } from './controllers/ShareController';
import { AnalyticsController } from './controllers/AnalyticsController';
import { PersonalityController } from './controllers/PersonalityController';
import { TestController } from './controllers/TestController';
import { ConfigurationController } from './controllers/ConfigurationController';
import { ImageController } from './controllers/ImageController';
import { QuestionService } from './modules/question/QuestionService';
import { ResultService } from './modules/result/ResultService';
import { ShareService } from './modules/share/ShareService';
import { AnalyticsService } from './modules/analytics/AnalyticsService';
import { PersonalityService } from './modules/personality/PersonalityService';
import { ScoringService } from './modules/scoring/ScoringService';
import { TestService } from './modules/test/TestService';
import { ConfigurationService } from './modules/configuration/ConfigurationService';
import { ImageService } from './modules/image/ImageService';
import { QuestionRepository } from './modules/question/QuestionRepository';
import { TestResultRepository } from './modules/result/TestResultRepository';
import { TestAnswerRepository } from './modules/result/TestAnswerRepository';
import { ShareLinkRepository } from './modules/share/ShareLinkRepository';
import { AnalyticsEventRepository } from './modules/analytics/AnalyticsEventRepository';
import { PersonalityTypeRepository } from './modules/personality/PersonalityTypeRepository';
import { TestRepository } from './modules/test/TestRepository';
import { ConfigurationRepository } from './modules/configuration/ConfigurationRepository';
import { S3Storage } from './infrastructure/storage/S3Storage';
import { Database } from './infrastructure/database/connection';
import { NotFoundError, AppError } from './shared/types/errors';
import config from './infrastructure/config/env';
import logger from './infrastructure/logger/winston';
import { requestIdMiddleware } from './shared/middleware/requestId';
import { globalRateLimit } from './shared/middleware/rateLimit';

export function createApp(): Application {
  const app = express();

  // Infrastructure
  const db = new Database();
  const storage = new S3Storage();

  // Repositories
  const personalityTypeRepository = new PersonalityTypeRepository(db);
  const questionRepository = new QuestionRepository(db);
  const testResultRepository = new TestResultRepository(db);
  const testAnswerRepository = new TestAnswerRepository(db);
  const shareLinkRepository = new ShareLinkRepository(db);
  const analyticsEventRepository = new AnalyticsEventRepository(db);
  const testRepository = new TestRepository(db);
  const configurationRepository = new ConfigurationRepository(db);

  // Services
  const personalityService = new PersonalityService(personalityTypeRepository);
  const questionService = new QuestionService(questionRepository);
  const scoringService = new ScoringService();
  const resultService = new ResultService(
    testResultRepository,
    testAnswerRepository,
    personalityTypeRepository,
    scoringService
  );
  const shareService = new ShareService(shareLinkRepository, testResultRepository);
  const analyticsService = new AnalyticsService(analyticsEventRepository);
  const testService = new TestService(testRepository, questionRepository);
  const configurationService = new ConfigurationService(configurationRepository);
  const imageService = new ImageService(storage, testResultRepository, personalityTypeRepository);

  // Controllers
  const personalityController = new PersonalityController(personalityService);
  const questionController = new QuestionController(questionService);
  const resultController = new ResultController(resultService);
  const shareController = new ShareController(shareService);
  const analyticsController = new AnalyticsController(analyticsService);
  const testController = new TestController(testService);
  const configurationController = new ConfigurationController(configurationService);
  const imageController = new ImageController(imageService);

  // Middleware
  app.use(helmet());
  app.use(cors({
    origin: config.cors.origin,
    credentials: true,
  }));
  app.use(requestIdMiddleware);
  app.use(globalRateLimit);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next();
  });

  // Routes
  const apiVersion = config.apiVersion;
  app.use(`/api/${apiVersion}`, createRoutes(
    questionController,
    resultController,
    shareController,
    analyticsController,
    personalityController,
    testController,
    configurationController,
    imageController
  ));

  // Root endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      name: 'ChickPersonality API',
      version: apiVersion,
      status: 'running',
      timestamp: new Date(),
    });
  });

  // 404 handler
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError('Route', 'not-found'));
  });

  // Error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error('Unhandled error', err);

    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        success: false,
        error: err.code,
        message: err.message,
        details: err.details,
        timestamp: new Date(),
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        timestamp: new Date(),
      });
    }
  });

  return app;
}
