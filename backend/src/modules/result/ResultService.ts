/**
 * Result Service
 * Business logic for test result operations
 */

import { TestResultRepository } from './TestResultRepository';
import { TestAnswerRepository } from './TestAnswerRepository';
import { PersonalityTypeRepository } from '../personality/PersonalityTypeRepository';
import { ScoringService } from '../scoring/ScoringService';
import {
  CreateTestResultDTO,
  TestResultResponseDTO,
  TestResultPublicDTO,
  BulkCreateTestAnswersDTO,
  PersonalityTypeResponseDTO,
  DeviceType,
} from '../../shared/types/entities';
import { NotFoundError, DatabaseError } from '../../shared/types/errors';

export class ResultService {
  constructor(
    private testResultRepository: TestResultRepository,
    private testAnswerRepository: TestAnswerRepository,
    private personalityTypeRepository: PersonalityTypeRepository,
    private scoringService: ScoringService,
  ) {}

  async createResult(
    answers: Array<{ question_id: string; answer_option_id: string; scoring_weights: any }>,
    deviceType: DeviceType,
    userAgent?: string,
    ipAddressHash?: string
  ): Promise<TestResultResponseDTO> {
    // Calculate scores
    const scoreBreakdown = this.scoringService.calculateScores(answers);
    const primarySlug = this.scoringService.determinePrimaryPersonality(scoreBreakdown);
    const secondarySlugs = this.scoringService.determineSecondaryPersonalities(scoreBreakdown, primarySlug);

    // Get personality type IDs
    const primaryPersonality = await this.personalityTypeRepository.findBySlug(primarySlug);
    if (!primaryPersonality) {
      throw new DatabaseError('Primary personality type not found');
    }

    const secondaryPersonalityIds: string[] = [];
    for (const slug of secondarySlugs) {
      const personality = await this.personalityTypeRepository.findBySlug(slug);
      if (personality) {
        secondaryPersonalityIds.push(personality.id);
      }
    }

    // Create test result
    const createDTO: CreateTestResultDTO = {
      primary_personality_id: primaryPersonality.id,
      secondary_personality_ids: secondaryPersonalityIds.length > 0 ? secondaryPersonalityIds : null,
      score_breakdown: scoreBreakdown,
      total_time_seconds: 0, // Will be calculated from timestamps if needed
      device_type: deviceType,
      user_agent: userAgent,
      ip_address_hash: ipAddressHash,
    };

    const testResult = await this.testResultRepository.create(createDTO);

    // Bulk create test answers
    const bulkAnswersDTO: BulkCreateTestAnswersDTO = {
      test_result_id: testResult.id,
      answers: answers.map(a => ({
        question_id: a.question_id,
        answer_option_id: a.answer_option_id,
      })),
    };
    await this.testAnswerRepository.bulkCreate(bulkAnswersDTO);

    // Build response with personality details
    const primaryPersonalityDTO = this.personalityTypeRepository.toResponseDTO(primaryPersonality);
    const secondaryPersonalitiesDTO: PersonalityTypeResponseDTO[] = [];
    for (const id of secondaryPersonalityIds) {
      const personality = await this.personalityTypeRepository.findById(id);
      if (personality) {
        secondaryPersonalitiesDTO.push(this.personalityTypeRepository.toResponseDTO(personality));
      }
    }

    return {
      id: testResult.id,
      share_token: testResult.share_token,
      primary_personality: primaryPersonalityDTO,
      secondary_personalities: secondaryPersonalitiesDTO,
      score_breakdown: scoreBreakdown,
      total_time_seconds: testResult.total_time_seconds,
      device_type: testResult.device_type,
      completed_at: testResult.completed_at,
    };
  }

  async getByShareToken(shareToken: string): Promise<TestResultPublicDTO> {
    const testResult = await this.testResultRepository.findByShareToken(shareToken);
    if (!testResult) {
      throw new NotFoundError('Test result', shareToken);
    }

    // Get personality details
    const primaryPersonality = await this.personalityTypeRepository.findById(testResult.primary_personality_id);
    if (!primaryPersonality) {
      throw new DatabaseError('Primary personality type not found');
    }

    const primaryPersonalityDTO = this.personalityTypeRepository.toResponseDTO(primaryPersonality);
    const secondaryPersonalitiesDTO: PersonalityTypeResponseDTO[] = [];

    const secondaryIds = typeof testResult.secondary_personality_ids === 'string'
      ? JSON.parse(testResult.secondary_personality_ids)
      : testResult.secondary_personality_ids;

    if (secondaryIds) {
      for (const id of secondaryIds) {
        const personality = await this.personalityTypeRepository.findById(id);
        if (personality) {
          secondaryPersonalitiesDTO.push(this.personalityTypeRepository.toResponseDTO(personality));
        }
      }
    }

    const scoreBreakdown = typeof testResult.score_breakdown === 'string'
      ? JSON.parse(testResult.score_breakdown)
      : testResult.score_breakdown;

    return {
      share_token: testResult.share_token,
      primary_personality: primaryPersonalityDTO,
      secondary_personalities: secondaryPersonalitiesDTO,
      score_breakdown: scoreBreakdown,
      completed_at: testResult.completed_at,
    };
  }

  async getById(id: string): Promise<TestResultResponseDTO> {
    const testResult = await this.testResultRepository.findById(id);
    if (!testResult) {
      throw new NotFoundError('Test result', id);
    }

    // Get personality details
    const primaryPersonality = await this.personalityTypeRepository.findById(testResult.primary_personality_id);
    if (!primaryPersonality) {
      throw new DatabaseError('Primary personality type not found');
    }

    const primaryPersonalityDTO = this.personalityTypeRepository.toResponseDTO(primaryPersonality);
    const secondaryPersonalitiesDTO: PersonalityTypeResponseDTO[] = [];

    const secondaryIds = typeof testResult.secondary_personality_ids === 'string'
      ? JSON.parse(testResult.secondary_personality_ids)
      : testResult.secondary_personality_ids;

    if (secondaryIds) {
      for (const id of secondaryIds) {
        const personality = await this.personalityTypeRepository.findById(id);
        if (personality) {
          secondaryPersonalitiesDTO.push(this.personalityTypeRepository.toResponseDTO(personality));
        }
      }
    }

    const scoreBreakdown = typeof testResult.score_breakdown === 'string'
      ? JSON.parse(testResult.score_breakdown)
      : testResult.score_breakdown;

    return {
      id: testResult.id,
      share_token: testResult.share_token,
      primary_personality: primaryPersonalityDTO,
      secondary_personalities: secondaryPersonalitiesDTO,
      score_breakdown: scoreBreakdown,
      total_time_seconds: testResult.total_time_seconds,
      device_type: testResult.device_type,
      completed_at: testResult.completed_at,
    };
  }

  async deleteOldResults(daysOld: number = 90): Promise<number> {
    return await this.testResultRepository.deleteOldResults(daysOld);
  }
}
