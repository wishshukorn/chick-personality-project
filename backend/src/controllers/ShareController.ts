/**
 * Share Controller
 * Handles HTTP requests for share link operations
 */

import { Request, Response, NextFunction } from 'express';
import { ShareService } from '../modules/share/ShareService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class ShareController {
  constructor(private shareService: ShareService) {}

  async createShareLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { test_result_id } = req.body;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      if (!test_result_id) {
        res.status(400).json({
          success: false,
          error: 'Validation error',
          message: 'test_result_id is required',
          timestamp: new Date(),
        });
        return;
      }

      const shareLink = await this.shareService.createShareLink(test_result_id, baseUrl);
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: shareLink,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async incrementClickCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { shareToken } = req.params;
      await this.shareService.incrementClickCount(shareToken);
      
      res.json({
        success: true,
        timestamp: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }
}
