/**
 * Personality Controller
 * Handles HTTP requests for personality type operations
 */

import { Request, Response, NextFunction } from 'express';
import { PersonalityService } from '../modules/personality/PersonalityService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class PersonalityController {
  constructor(private personalityService: PersonalityService) {}

  async getAllPersonalities(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personalities = await this.personalityService.getAll();
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: personalities,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getPersonalityBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const personality = await this.personalityService.getBySlug(slug as any);
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: personality,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCompatibilityMatrix(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const matrix = await this.personalityService.getCompatibilityMatrix(slug as any);
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: matrix,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
