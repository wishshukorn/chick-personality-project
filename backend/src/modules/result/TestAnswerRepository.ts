/**
 * Test Answer Repository
 * Handles database operations for test answers
 */

import { IDatabase } from '../../shared/interfaces/IDatabase';
import { IRepository } from '../../shared/interfaces/IRepository';
import {
  TestAnswer,
  CreateTestAnswerDTO,
  BulkCreateTestAnswersDTO,
  TestAnswerResponseDTO,
} from '../../shared/types/entities';

export class TestAnswerRepository implements IRepository<TestAnswer, CreateTestAnswerDTO, any> {
  constructor(private db: IDatabase) {}

  async findById(id: string): Promise<TestAnswer | null> {
    const query = `
      SELECT * FROM test_answers
      WHERE id = $1
    `;
    const result = await this.db.query<any>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByTestResultId(testResultId: string): Promise<TestAnswer[]> {
    const query = `
      SELECT * FROM test_answers
      WHERE test_result_id = $1
      ORDER BY answered_at ASC
    `;
    const result = await this.db.query<any>(query, [testResultId]);
    return result.rows;
  }

  async create(dto: CreateTestAnswerDTO): Promise<TestAnswer> {
    const query = `
      INSERT INTO test_answers (id, test_result_id, question_id, answer_option_id, answered_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const { v4: uuidv4 } = require('uuid');
    const id = uuidv4();
    
    const values = [
      id,
      dto.test_result_id,
      dto.question_id,
      dto.answer_option_id,
    ];

    const result = await this.db.query<any>(query, values);
    return result.rows[0];
  }

  async bulkCreate(dto: BulkCreateTestAnswersDTO): Promise<TestAnswer[]> {
    const { v4: uuidv4 } = require('uuid');
    
    return this.db.transaction(async (client) => {
      const createdAnswers: TestAnswer[] = [];
      
      for (const answer of dto.answers) {
        const id = uuidv4();
        const query = `
          INSERT INTO test_answers (id, test_result_id, question_id, answer_option_id, answered_at)
          VALUES ($1, $2, $3, $4, NOW())
          RETURNING *
        `;
        const result = await client.query(query, [
          id,
          dto.test_result_id,
          answer.question_id,
          answer.answer_option_id,
        ]);
        createdAnswers.push(result.rows[0]);
      }
      
      return createdAnswers;
    });
  }

  async findMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<TestAnswer[]> {
    const query = `SELECT * FROM test_answers ORDER BY answered_at DESC LIMIT 100`;
    const result = await this.db.query<any>(query, []);
    return result.rows;
  }

  async findManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: TestAnswer[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    const offset = (page - 1) * pageSize;

    const countQuery = `SELECT COUNT(*) as count FROM test_answers`;
    const countResult = await this.db.query<any>(countQuery, []);
    const total = parseInt(countResult.rows[0].count, 10);

    const query = `
      SELECT * FROM test_answers
      ORDER BY answered_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await this.db.query<any>(query, [pageSize, offset]);

    return {
      data: result.rows,
      pagination: { page, page_size: pageSize, total },
    };
  }

  async update(id: string, dto: any): Promise<TestAnswer> {
    throw new Error('Update not implemented for TestAnswer');
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM test_answers WHERE id = $1`;
    await this.db.query<any>(query, [id]);
  }

  async deleteByTestResultId(testResultId: string): Promise<boolean> {
    const query = `
      DELETE FROM test_answers
      WHERE test_result_id = $1
      RETURNING id
    `;
    const result = await this.db.query<any>(query, [testResultId]);
    return result.rows.length > 0;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM test_answers`;
    const result = await this.db.query<any>(query, []);
    return parseInt(result.rows[0].count, 10);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM test_answers WHERE id = $1)`;
    const result = await this.db.query<any>(query, [id]);
    return result.rows[0].exists;
  }

  async countByTestResultId(testResultId: string): Promise<number> {
    const query = `
      SELECT COUNT(*) as count FROM test_answers
      WHERE test_result_id = $1
    `;
    const result = await this.db.query<any>(query, [testResultId]);
    return parseInt(result.rows[0].count, 10);
  }

  toResponseDTO(entity: TestAnswer): TestAnswerResponseDTO {
    return {
      id: entity.id,
      test_result_id: entity.test_result_id,
      question_id: entity.question_id,
      answer_option_id: entity.answer_option_id,
      answered_at: entity.answered_at,
    };
  }
}
