/**
 * Test Result Repository
 * Handles database operations for test results
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  TestResult,
  CreateTestResultDTO,
  TestResultResponseDTO,
  TestResultPublicDTO,
} from '../../shared/types/entities';

export class TestResultRepository implements IRepository<TestResult, CreateTestResultDTO, any> {
  constructor(private db: IDatabase) {}

  async findById(id: string): Promise<TestResult | null> {
    const query = `
      SELECT * FROM test_results
      WHERE id = $1
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByShareToken(shareToken: string): Promise<TestResult | null> {
    const query = `
      SELECT tr.* FROM test_results tr
      INNER JOIN share_links sl ON tr.id = sl.test_result_id
      WHERE tr.share_token = $1
        AND sl.expires_at > NOW()
    `;
    const result = await this.db.query<any>(query, [shareToken]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async create(dto: CreateTestResultDTO): Promise<TestResult> {
    const query = `
      INSERT INTO test_results (
        id, share_token, primary_personality_id, secondary_personality_ids,
        score_breakdown, total_time_seconds, device_type, user_agent,
        ip_address_hash, completed_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const crypto = require('crypto');
    const id = uuidv4();
    const shareToken = crypto.randomBytes(16).toString('hex');
    
    const values = [
      id,
      shareToken,
      dto.primary_personality_id,
      dto.secondary_personality_ids ? JSON.stringify(dto.secondary_personality_ids) : null,
      JSON.stringify(dto.score_breakdown),
      dto.total_time_seconds,
      dto.device_type,
      dto.user_agent || null,
      dto.ip_address_hash || null,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<TestResult[]> {
    const query = `
      SELECT * FROM test_results
      ORDER BY completed_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [limit, offset]);
    return result.rows;
  }

  async findByPersonalityType(personalityId: string, limit: number = 100): Promise<TestResult[]> {
    const query = `
      SELECT * FROM test_results
      WHERE primary_personality_id = $1
      ORDER BY completed_at DESC
      LIMIT $2
    `;
    const result = await this.db.query<any>(query, [personalityId, limit]);
    return result.rows;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM test_results`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM test_results WHERE id = $1)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async countByPersonalityType(personalityId: string): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM test_results
      WHERE primary_personality_id = $1
    `;
    const result = await this.db.query<any>(query, [personalityId]);
    return parseInt(result.rows[0].count, 10);
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<TestResult[]> {
    const query = `
      SELECT * FROM test_results
      ORDER BY completed_at DESC
      LIMIT 100
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: TestResult[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM test_results`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM test_results
      ORDER BY completed_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: any): Promise<TestResult> {
    throw new Error('Update not implemented for TestResult');
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM test_results WHERE id = $1`;
    await this.db.query<any>(query, [id]);
  }

  async deleteOldResults(daysOld: number = 90): Promise<number> {
    const query = `
      DELETE FROM test_results
      WHERE completed_at < NOW() - INTERVAL '${daysOld} days'
      RETURNING id
    `;
    const result = await this.db.query<any>(query, []);
    return result.rowCount || 0;
  }

  toResponseDTO(entity: TestResult): TestResultResponseDTO {
    return {
      id: entity.id,
      share_token: entity.share_token,
      primary_personality: {} as any, // Will be populated by service
      secondary_personalities: [],
      score_breakdown: typeof entity.score_breakdown === 'string' 
        ? JSON.parse(entity.score_breakdown) 
        : entity.score_breakdown,
      total_time_seconds: entity.total_time_seconds,
      device_type: entity.device_type,
      completed_at: entity.completed_at,
    };
  }

  toPublicDTO(entity: TestResult): TestResultPublicDTO {
    return {
      share_token: entity.share_token,
      primary_personality: {} as any, // Will be populated by service
      secondary_personalities: [],
      score_breakdown: typeof entity.score_breakdown === 'string' 
        ? JSON.parse(entity.score_breakdown) 
        : entity.score_breakdown,
      completed_at: entity.completed_at,
    };
  }
}
