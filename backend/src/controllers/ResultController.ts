/**
 * Result Controller
 * Handles HTTP requests for test result operations
 */

import { Request, Response, NextFunction } from 'express';
import { ResultService } from '../modules/result/ResultService';
import { SuccessResponseDTO } from '../shared/types/entities';
import { DeviceType } from '../shared/types/entities';

export class ResultController {
  constructor(private resultService: ResultService) {}

  async createResult(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { answers, device_type, user_agent, ip_address_hash } = req.body;
      
      // Validate request
      if (!answers || !Array.isArray(answers) || answers.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Validation error',
          message: 'Answers array is required',
          timestamp: new Date(),
        });
        return;
      }

      const result = await this.resultService.createResult(
        answers,
        device_type || DeviceType.DESKTOP,
        user_agent,
        ip_address_hash
      );
      
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

  async getResultByShareToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { shareToken } = req.params;
      const result = await this.resultService.getByShareToken(shareToken);
      
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

  async getResultById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.resultService.getById(id);
      
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
