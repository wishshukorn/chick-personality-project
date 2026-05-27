/**
 * Test Session Service
 * Business logic for test session operations
 */

import { TestRepository } from './TestRepository';
import { QuestionRepository } from '../question/QuestionRepository';
import {
  TestSession,
  CreateTestSessionDTO,
  UpdateTestSessionDTO,
  TestSessionResponseDTO,
  SubmitAnswerDTO,
  SubmitAnswerResponseDTO,
  FinishTestDTO,
} from '../../shared/types/entities';
import { NotFoundError, ValidationError } from '../../shared/types/errors';

export class TestService {
  constructor(
    private testRepository: TestRepository,
    private questionRepository: QuestionRepository
  ) {}

  async startTest(dto: CreateTestSessionDTO): Promise<TestSessionResponseDTO> {
    const session = await this.testRepository.create(dto);
    const questionCount = await this.testRepository.getActiveQuestionCount();
    
    return {
      id: session.id,
      device_type: session.device_type,
      started_at: session.started_at,
      question_count: questionCount,
    };
  }

  async submitAnswer(dto: SubmitAnswerDTO): Promise<SubmitAnswerResponseDTO> {
    // Validate session exists and is not expired
    const session = await this.testRepository.findById(dto.session_id);
    if (!session) {
      throw new NotFoundError('Test session', dto.session_id);
    }

    // Validate answer option belongs to the question
    const isValid = await this.testRepository.validateAnswerOption(
      dto.question_id,
      dto.answer_option_id
    );
    if (!isValid) {
      throw new ValidationError('Answer option does not belong to the specified question');
    }

    // Get question number
    const questionNumber = await this.testRepository.getQuestionNumber(dto.question_id);
    if (!questionNumber) {
      throw new NotFoundError('Question', dto.question_id);
    }

    // Calculate next question number
    const totalQuestions = await this.testRepository.getActiveQuestionCount();
    const nextQuestionNumber = questionNumber < totalQuestions ? questionNumber + 1 : questionNumber;

    return {
      session_id: dto.session_id,
      question_number: questionNumber,
      answered_at: new Date(),
      next_question_number: nextQuestionNumber,
    };
  }

  async finishTest(dto: FinishTestDTO): Promise<any> {
    // Validate session exists and is not expired
    const session = await this.testRepository.findById(dto.session_id);
    if (!session) {
      throw new NotFoundError('Test session', dto.session_id);
    }

    // Validate all answers are provided
    const totalQuestions = await this.testRepository.getActiveQuestionCount();
    if (dto.answers.length !== totalQuestions) {
      throw new ValidationError(
        `Not all questions have been answered. Required: ${totalQuestions}, Provided: ${dto.answers.length}`
      );
    }

    // Validate each answer
    for (const answer of dto.answers) {
      const isValid = await this.testRepository.validateAnswerOption(
        answer.question_id,
        answer.answer_option_id
      );
      if (!isValid) {
        throw new ValidationError('Invalid answer option provided');
      }
    }

    // Return the data needed for result creation
    // The actual result creation will be handled by ResultService
    return {
      session_id: dto.session_id,
      answers: dto.answers,
      total_time_seconds: dto.total_time_seconds,
      device_type: session.device_type,
      user_agent: session.user_agent,
      ip_address_hash: session.ip_address_hash,
    };
  }

  async getSession(sessionId: string): Promise<TestSession | null> {
    return await this.testRepository.findById(sessionId);
  }

  async updateSession(sessionId: string, dto: UpdateTestSessionDTO): Promise<TestSession> {
    const session = await this.testRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundError('Test session', sessionId);
    }
    return await this.testRepository.update(sessionId, dto);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.testRepository.delete(sessionId);
  }
}
