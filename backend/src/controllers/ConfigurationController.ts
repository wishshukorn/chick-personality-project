/**
 * Configuration Controller
 * Handles HTTP requests for configuration operations
 */

import { Request, Response, NextFunction } from 'express';
import { ConfigurationService } from '../modules/configuration/ConfigurationService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  async getPublicConfig(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const config = await this.configurationService.getPublicConfig();
      
      const response: SuccessResponseDTO<Record<string, string>> = {
        success: true,
        data: config,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
