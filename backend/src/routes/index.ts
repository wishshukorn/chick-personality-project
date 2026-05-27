/**
 * API Routes
 * Defines all API endpoints and connects them to controllers
 */

import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';
import { ResultController } from '../controllers/ResultController';
import { ShareController } from '../controllers/ShareController';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { PersonalityController } from '../controllers/PersonalityController';
import { TestController } from '../controllers/TestController';
import { ConfigurationController } from '../controllers/ConfigurationController';
import { ImageController } from '../controllers/ImageController';

export function createRoutes(
  questionController: QuestionController,
  resultController: ResultController,
  shareController: ShareController,
  analyticsController: AnalyticsController,
  personalityController: PersonalityController,
  testController: TestController,
  configurationController: ConfigurationController,
  imageController: ImageController
): Router {
  const router = Router();

  // Health check
  router.get('/health', (_req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      services: {
        database: 'healthy',
        cache: 'healthy',
        storage: 'healthy',
      },
      version: '1.0.0',
    });
  });

  // Test session management
  router.post('/test/start', testController.startTest.bind(testController));
  router.post('/test/answer', testController.submitAnswer.bind(testController));
  router.post('/test/finish', testController.finishTest.bind(testController));

  // Personality types
  router.get('/personalities', personalityController.getAllPersonalities.bind(personalityController));
  router.get('/personalities/:slug', personalityController.getPersonalityBySlug.bind(personalityController));
  router.get('/personalities/:slug/compatibility', personalityController.getCompatibilityMatrix.bind(personalityController));

  // Questions
  router.get('/questions', questionController.getAllQuestions.bind(questionController));
  router.get('/questions/:id', questionController.getQuestionById.bind(questionController));

  // Results
  router.post('/results', resultController.createResult.bind(resultController));
  router.get('/results/:shareToken', resultController.getResultByShareToken.bind(resultController));
  router.get('/results/id/:id', resultController.getResultById.bind(resultController));

  // Share links
  router.post('/share/create', shareController.createShareLink.bind(shareController));
  router.post('/share/:shareToken/click', shareController.incrementClickCount.bind(shareController));

  // Configuration
  router.get('/config/public', configurationController.getPublicConfig.bind(configurationController));

  // Image generation
  router.post('/image/generate', imageController.generateImage.bind(imageController));

  // Analytics
  router.post('/analytics/events', analyticsController.trackEvent.bind(analyticsController));
  router.get('/analytics/aggregated', analyticsController.getAggregatedData.bind(analyticsController));
  router.get('/analytics/count', analyticsController.getEventCount.bind(analyticsController));

  return router;
}
