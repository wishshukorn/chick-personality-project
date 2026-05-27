/**
 * Test Session Repository
 * Handles database operations for test sessions
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  TestSession,
  CreateTestSessionDTO,
  UpdateTestSessionDTO,
} from '../../shared/types/entities';

export class TestRepository implements IRepository<TestSession, CreateTestSessionDTO, UpdateTestSessionDTO> {
  constructor(private db: IDatabase) {}

  async create(dto: CreateTestSessionDTO): Promise<TestSession> {
    const query = `
      INSERT INTO test_sessions (id, device_type, user_agent, ip_address_hash, started_at, expires_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '1 hour')
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.device_type,
      dto.user_agent || null,
      dto.ip_address_hash || null,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async findById(id: string): Promise<TestSession | null> {
    const query = `
      SELECT * FROM test_sessions
      WHERE id = $1 AND expires_at > NOW()
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<TestSession[]> {
    const query = `
      SELECT * FROM test_sessions
      WHERE expires_at > NOW()
      ORDER BY created_at DESC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: TestSession[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM test_sessions WHERE expires_at > NOW()`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM test_sessions
      WHERE expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: UpdateTestSessionDTO): Promise<TestSession> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.expires_at !== undefined) {
      updates.push(`expires_at = $${paramIndex++}`);
      values.push(dto.expires_at);
    }

    if (updates.length === 0) {
      const existing = await this.findById(id);
      if (!existing) {
        throw new Error('Test session not found');
      }
      return existing;
    }

    values.push(id);
    const query = `
      UPDATE test_sessions
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.db.query<any>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Test session not found');
    }
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `
      UPDATE test_sessions
      SET expires_at = NOW()
      WHERE id = $1
    `;
    await this.db.query<any>(query, [id]);
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM test_sessions
      WHERE expires_at > NOW()
    `;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM test_sessions WHERE id = $1 AND expires_at > NOW())`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async getActiveQuestionCount(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM questions WHERE is_active = true`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async validateAnswerOption(questionId: string, answerOptionId: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM answer_options 
        WHERE id = $1 AND question_id = $2 AND is_active = true
      )
    `;
    const result = await this.db.query<any>(query, [answerOptionId, questionId]);
    return result.rows[0].exists;
  }

  async getQuestionNumber(questionId: string): Promise<number | null> {
    const query = `SELECT question_number FROM questions WHERE id = $1 AND is_active = true`;
    const result = await this.db.query<any>(query, [questionId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].question_number;
  }
}
