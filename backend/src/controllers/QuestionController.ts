/**
 * Question Controller
 * Handles HTTP requests for question operations
 */

import { Request, Response, NextFunction } from 'express';
import { QuestionService } from '../modules/question/QuestionService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class QuestionController {
  constructor(private questionService: QuestionService) {}

  async getAllQuestions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = await this.questionService.getAllWithOptions();
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: questions,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const question = await this.questionService.getByIdWithOptions(id);
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: question,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
