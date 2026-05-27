/**
 * Analytics Event Repository
 * Handles database operations for analytics events
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  AnalyticsEvent,
  CreateAnalyticsEventDTO,
  AnalyticsEventResponseDTO,
  AnalyticsAggregationDTO,
  EventType,
} from '../../shared/types/entities';

export class AnalyticsEventRepository implements IRepository<AnalyticsEvent, CreateAnalyticsEventDTO, any> {
  constructor(private db: IDatabase) {}

  async findById(id: string): Promise<AnalyticsEvent | null> {
    const query = `
      SELECT * FROM analytics_events
      WHERE id = $1
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async create(dto: CreateAnalyticsEventDTO): Promise<AnalyticsEvent> {
    const query = `
      INSERT INTO analytics_events (
        id, event_type, event_data, personality_type_slug,
        device_type, session_id, ip_address_hash, occurred_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.event_type,
      dto.event_data ? JSON.stringify(dto.event_data) : null,
      dto.personality_type_slug || null,
      dto.device_type || null,
      dto.session_id || null,
      dto.ip_address_hash || null,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async findByEventType(
    eventType: EventType,
    limit: number = 100,
    offset: number = 0
  ): Promise<AnalyticsEvent[]> {
    const query = `
      SELECT * FROM analytics_events
      WHERE event_type = $1
      ORDER BY occurred_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await this.db.query<any>(query, [eventType, limit, offset]);
    return result.rows;
  }

  async findBySessionId(sessionId: string, limit: number = 100): Promise<AnalyticsEvent[]> {
    const query = `
      SELECT * FROM analytics_events
      WHERE session_id = $1
      ORDER BY occurred_at ASC
      LIMIT $2
    `;
    const result = await this.db.query<any>(query, [sessionId, limit]);
    return result.rows;
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 1000
  ): Promise<AnalyticsEvent[]> {
    const query = `
      SELECT * FROM analytics_events
      WHERE occurred_at >= $1 AND occurred_at <= $2
      ORDER BY occurred_at DESC
      LIMIT $3
    `;
    const result = await this.db.query<any>(query, [startDate, endDate, limit]);
    return result.rows;
  }

  async aggregateByEventType(
    startDate: Date,
    endDate: Date
  ): Promise<AnalyticsAggregationDTO[]> {
    const query = `
      SELECT 
        event_type,
        COUNT(*) as count,
        json_agg(json_build_object(
          'personality_type_slug', personality_type_slug,
          'count', sub.count
        )) as by_personality_type,
        json_agg(json_build_object(
          'device_type', device_type,
          'count', sub.count
        )) as by_device_type
      FROM analytics_events
      WHERE occurred_at >= $1 AND occurred_at <= $2
      GROUP BY event_type
      ORDER BY count DESC
    `;
    const result = await this.db.query<any>(query, [startDate, endDate]);
    
    return result.rows.map((row: any) => ({
      event_type: row.event_type,
      count: parseInt(row.count, 10),
      by_personality_type: this._aggregateByField(row.by_personality_type, 'personality_type_slug'),
      by_device_type: this._aggregateByField(row.by_device_type, 'device_type'),
      date_range: { start: startDate, end: endDate },
    }));
  }

  private _aggregateByField(data: any[], field: string): Record<string, number> {
    const result: Record<string, number> = {};
    for (const item of data) {
      const key = item[field];
      if (key) {
        result[key] = (result[key] || 0) + 1;
      }
    }
    return result;
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<AnalyticsEvent[]> {
    const query = `SELECT * FROM analytics_events ORDER BY occurred_at DESC LIMIT 100`;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: AnalyticsEvent[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM analytics_events`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM analytics_events
      ORDER BY occurred_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: any): Promise<AnalyticsEvent> {
    throw new Error('Update not implemented for AnalyticsEvent');
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM analytics_events WHERE id = $1`;
    await this.db.query<any>(query, [id]);
  }

  async deleteOldEvents(daysOld: number = 365): Promise<number> {
    const query = `
      DELETE FROM analytics_events
      WHERE occurred_at < NOW() - INTERVAL '${daysOld} days'
      RETURNING id
    `;
    const result = await this.db.query<any>(query, []);
    return result.rowCount || 0;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM analytics_events`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM analytics_events WHERE id = $1)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async countByEventType(eventType: EventType): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM analytics_events
      WHERE event_type = $1
    `;
    const result = await this.db.query<any>(query, [eventType]);
    return parseInt(result.rows[0].count, 10);
  }

  toResponseDTO(entity: AnalyticsEvent): AnalyticsEventResponseDTO {
    return {
      id: entity.id,
      event_type: entity.event_type,
      event_data: typeof entity.event_data === 'string' 
        ? JSON.parse(entity.event_data) 
        : entity.event_data,
      personality_type_slug: entity.personality_type_slug,
      device_type: entity.device_type,
      session_id: entity.session_id,
      occurred_at: entity.occurred_at,
    };
  }
}
