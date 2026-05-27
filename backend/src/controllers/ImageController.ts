/**
 * Image Controller
 * Handles HTTP requests for image generation operations
 */

import { Request, Response, NextFunction } from 'express';
import { ImageService } from '../modules/image/ImageService';
import { SuccessResponseDTO } from '../shared/types/entities';

export class ImageController {
  constructor(private imageService: ImageService) {}

  async generateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { share_token } = req.body;
      
      const result = await this.imageService.generateShareCard(share_token);
      
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
