/**
 * Question Service
 * Business logic for question operations
 */

import { QuestionRepository } from './QuestionRepository';
import {
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionResponseDTO,
  QuestionWithOptionsDTO,
} from '../../shared/types/entities';
import { IService } from '../../shared/interfaces/IService';
import { NotFoundError } from '../../shared/types/errors';

export class QuestionService implements IService<QuestionResponseDTO, CreateQuestionDTO, UpdateQuestionDTO> {
  constructor(private repository: QuestionRepository) {}

  async getMany(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<QuestionResponseDTO[]> {
    const questions = await this.repository.findAll();
    return questions.map(q => this.repository.toResponseDTO(q));
  }

  async getManyPaginated(
    filter?: Record<string, any>,
    pagination?: { page?: number; page_size?: number }
  ): Promise<{ data: QuestionResponseDTO[]; pagination: { page: number; page_size: number; total: number } }> {
    const page = pagination?.page || 1;
    const pageSize = pagination?.page_size || 10;
    
    const questions = await this.repository.findAll();
    const total = questions.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = questions.slice(start, end);
    
    return {
      data: paginated.map(q => this.repository.toResponseDTO(q)),
      pagination: { page, page_size: pageSize, total },
    };
  }

  async getAll(): Promise<QuestionResponseDTO[]> {
    const questions = await this.repository.findAll();
    return questions.map(q => this.repository.toResponseDTO(q));
  }

  async getAllWithOptions(): Promise<QuestionWithOptionsDTO[]> {
    const questions = await this.repository.findAllWithOptions();
    return questions.map(q => ({
      ...q,
      answer_options: q.answer_options.map((ao: any) => ({
        ...ao,
        scoring_weights: typeof ao.scoring_weights === 'string' 
          ? JSON.parse(ao.scoring_weights) 
          : ao.scoring_weights,
      })),
    }));
  }

  async getById(id: string): Promise<QuestionResponseDTO | null> {
    const question = await this.repository.findById(id);
    if (!question) {
      return null;
    }
    return this.repository.toResponseDTO(question);
  }

  async getByIdWithOptions(id: string): Promise<QuestionWithOptionsDTO> {
    const question = await this.repository.findByIdWithOptions(id);
    if (!question) {
      throw new NotFoundError('Question', id);
    }
    return {
      ...question,
      answer_options: question.answer_options.map((ao: any) => ({
        ...ao,
        scoring_weights: typeof ao.scoring_weights === 'string' 
          ? JSON.parse(ao.scoring_weights) 
          : ao.scoring_weights,
      })),
    };
  }

  async getByNumber(questionNumber: number): Promise<QuestionResponseDTO> {
    const question = await this.repository.findByNumber(questionNumber);
    if (!question) {
      throw new NotFoundError('Question', questionNumber.toString());
    }
    return this.repository.toResponseDTO(question);
  }

  async create(dto: CreateQuestionDTO): Promise<QuestionResponseDTO> {
    const question = await this.repository.create(dto);
    return this.repository.toResponseDTO(question);
  }

  async update(id: string, dto: UpdateQuestionDTO): Promise<QuestionResponseDTO> {
    const question = await this.repository.update(id, dto);
    return this.repository.toResponseDTO(question);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getActiveQuestionCount(): Promise<number> {
    return await this.repository.count();
  }
}
