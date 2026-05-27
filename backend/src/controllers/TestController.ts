/**
 * Test Controller
 * Handles HTTP requests for test session operations
 */

import { Request, Response, NextFunction } from 'express';
import { TestService } from '../modules/test/TestService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class TestController {
  constructor(private testService: TestService) {}

  async startTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { device_type, user_agent } = req.body;
      
      const session = await this.testService.startTest({
        device_type,
        user_agent,
      });
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: session,
        timestamp: new Date(),
      };
      
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async submitAnswer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { session_id, question_id, answer_option_id } = req.body;
      
      const result = await this.testService.submitAnswer({
        session_id,
        question_id,
        answer_option_id,
      });
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: result,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async finishTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { session_id, answers, total_time_seconds } = req.body;
      
      const result = await this.testService.finishTest({
        session_id,
        answers,
        total_time_seconds,
      });
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: result,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
