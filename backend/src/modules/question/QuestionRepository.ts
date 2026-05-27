/**
 * Question Repository
 * Handles database operations for questions
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionResponseDTO,
  QuestionWithOptionsDTO,
} from '../../shared/types/entities';

export class QuestionRepository implements IRepository<Question, CreateQuestionDTO, UpdateQuestionDTO> {
  constructor(private db: IDatabase) {}

  async findAll(): Promise<Question[]> {
    const query = `
      SELECT * FROM questions
      WHERE is_active = true
      ORDER BY question_number ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findById(id: string): Promise<Question | null> {
    const query = `
      SELECT * FROM questions
      WHERE id = $1 AND is_active = true
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByNumber(questionNumber: number): Promise<Question | null> {
    const query = `
      SELECT * FROM questions
      WHERE question_number = $1 AND is_active = true
    `;
    const result = await this.db.query<any>(query, [questionNumber]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findAllWithOptions(): Promise<QuestionWithOptionsDTO[]> {
    const query = `
      SELECT 
        q.id,
        q.question_text,
        q.question_number,
        q.category,
        q.is_active,
        q.created_at,
        q.updated_at,
        json_agg(
          json_build_object(
            'id', ao.id,
            'question_id', ao.question_id,
            'option_text', ao.option_text,
            'option_order', ao.option_order,
            'is_active', ao.is_active,
            'created_at', ao.created_at,
            'updated_at', ao.updated_at
          ) ORDER BY ao.option_order
        ) as answer_options
      FROM questions q
      LEFT JOIN answer_options ao ON q.id = ao.question_id AND ao.is_active = true
      WHERE q.is_active = true
      GROUP BY q.id, q.question_text, q.question_number, q.category, q.is_active, q.created_at, q.updated_at
      ORDER BY q.question_number ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findByIdWithOptions(id: string): Promise<QuestionWithOptionsDTO | null> {
    const query = `
      SELECT 
        q.id,
        q.question_text,
        q.question_number,
        q.category,
        q.is_active,
        q.created_at,
        q.updated_at,
        json_agg(
          json_build_object(
            'id', ao.id,
            'question_id', ao.question_id,
            'option_text', ao.option_text,
            'option_order', ao.option_order,
            'scoring_weights', ao.scoring_weights,
            'is_active', ao.is_active,
            'created_at', ao.created_at,
            'updated_at', ao.updated_at
          ) ORDER BY ao.option_order
        ) as answer_options
      FROM questions q
      LEFT JOIN answer_options ao ON q.id = ao.question_id AND ao.is_active = true
      WHERE q.id = $1 AND q.is_active = true
      GROUP BY q.id, q.question_text, q.question_number, q.category, q.is_active, q.created_at, q.updated_at
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async create(dto: CreateQuestionDTO): Promise<Question> {
    const query = `
      INSERT INTO questions (id, question_text, question_number, category, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.question_text,
      dto.question_number,
      dto.category || null,
      dto.is_active !== undefined ? dto.is_active : true,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async update(id: string, dto: UpdateQuestionDTO): Promise<Question> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.question_text !== undefined) {
      updates.push(`question_text = $${paramIndex++}`);
      values.push(dto.question_text);
    }
    if (dto.category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(dto.category);
    }
    if (dto.is_active !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(dto.is_active);
    }

    if (updates.length === 0) {
      const existing = await this.findById(id);
      if (!existing) {
        throw new Error('Question not found');
      }
      return existing;
    }

    values.push(id);
    const query = `
      UPDATE questions
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await this.db.query<any>(query, values);
    if (result.rows.length === 0) {
      throw new Error('Question not found');
    }
    return result.rows[0];
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<Question[]> {
    const query = `
      SELECT * FROM questions
      WHERE is_active = true
      ORDER BY question_number ASC
    `;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: Question[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM questions WHERE is_active = true`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM questions
      WHERE is_active = true
      ORDER BY question_number ASC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async delete(id: string): Promise<void> {
    const query = `
      UPDATE questions
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
    `;
    await this.db.query<any>(query, [id]);
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM questions
      WHERE is_active = true
    `;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM questions WHERE id = $1 AND is_active = true)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  toResponseDTO(entity: Question): QuestionResponseDTO {
    return {
      id: entity.id,
      question_text: entity.question_text,
      question_number: entity.question_number,
      category: entity.category,
      is_active: entity.is_active,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
