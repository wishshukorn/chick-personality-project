/**
 * Analytics Controller
 * Handles HTTP requests for analytics operations
 */

import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../modules/analytics/AnalyticsService';
import { SuccessResponseDTO } from '../shared/types/entities';
import { EventType } from '../shared/types/entities';

export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  async trackEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { event_type, event_data, personality_type_slug, device_type, session_id, ip_address_hash } = req.body;
      
      const event = await this.analyticsService.trackEvent({
        event_type,
        event_data,
        personality_type_slug,
        device_type,
        session_id,
        ip_address_hash,
      });
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data: event,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAggregatedData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { start_date, end_date } = req.query;
      
      if (!start_date || !end_date) {
        res.status(400).json({
          success: false,
          error: 'Validation error',
          message: 'start_date and end_date are required',
          timestamp: new Date(),
        });
        return;
      }

      const startDate = new Date(start_date as string);
      const endDate = new Date(end_date as string);
      
      const data = await this.analyticsService.getAggregatedData(startDate, endDate);
      
      const response: SuccessResponseDTO<any> = {
        success: true,
        data,
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getEventCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { event_type } = req.query;
      
      const count = event_type 
        ? await this.analyticsService.getEventCount(event_type as EventType)
        : await this.analyticsService.getEventCount();
      
      const response: SuccessResponseDTO<{ count: number }> = {
        success: true,
        data: { count },
        timestamp: new Date(),
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
