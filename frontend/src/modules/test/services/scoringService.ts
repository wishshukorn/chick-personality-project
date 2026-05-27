import { PersonalityTypeSlug, ScoreBreakdown, TestAnswer, AnswerOption } from '../../../shared/types';
import { PERSONALITY_TYPES } from '../../../infrastructure/constants/personalityTypes';
import { ANSWER_OPTIONS } from '../../../infrastructure/constants/questions';

export class ScoringService {
  /**
   * Calculate personality scores from answers
   */
  static calculateScores(answers: TestAnswer[]): ScoreBreakdown {
    const rawScores: Record<PersonalityTypeSlug, number> = {
      [PersonalityTypeSlug.BOLD_EXPLORER]: 0,
      [PersonalityTypeSlug.WISE_GUARDIAN]: 0,
      [PersonalityTypeSlug.CREATIVE_SPARK]: 0,
      [PersonalityTypeSlug.SOCIAL_BUTTERFLY]: 0,
      [PersonalityTypeSlug.QUIET_OBSERVER]: 0,
      [PersonalityTypeSlug.NATURAL_LEADER]: 0,
      [PersonalityTypeSlug.GENTLE_PEACEMAKER]: 0,
    };

    // Sum up scores from each answer
    answers.forEach(answer => {
      const option = ANSWER_OPTIONS.find(opt => opt.id === answer.answer_option_id);
      if (option) {
        Object.entries(option.scoring_weights).forEach(([slug, weight]) => {
          rawScores[slug as PersonalityTypeSlug] += weight;
        });
      }
    });

    // Calculate total score
    const totalScore = Object.values(rawScores).reduce((sum, score) => sum + score, 0);

    // Convert to percentages
    const breakdown: ScoreBreakdown = {};
    Object.entries(rawScores).forEach(([slug, rawScore]) => {
      breakdown[slug as PersonalityTypeSlug] = {
        percentage: totalScore > 0 ? Math.round((rawScore / totalScore) * 100) : 0,
        raw_score: rawScore,
      };
    });

    return breakdown;
  }

  /**
   * Determine primary personality type from score breakdown
   */
  static determinePrimaryPersonality(scoreBreakdown: ScoreBreakdown): PersonalityTypeSlug {
    let maxPercentage = 0;
    let primarySlug: PersonalityTypeSlug = PersonalityTypeSlug.BOLD_EXPLORER;

    Object.entries(scoreBreakdown).forEach(([slug, data]) => {
      if (data.percentage > maxPercentage) {
        maxPercentage = data.percentage;
        primarySlug = slug as PersonalityTypeSlug;
      }
    });

    // Handle ties by using priority order
    const tiedTypes: PersonalityTypeSlug[] = [];
    Object.entries(scoreBreakdown).forEach(([slug, data]) => {
      if (data.percentage === maxPercentage) {
        tiedTypes.push(slug as PersonalityTypeSlug);
      }
    });

    if (tiedTypes.length > 1) {
      // Use priority order to break ties
      const sortedByPriority = tiedTypes.sort((a, b) => {
        const typeA = PERSONALITY_TYPES.find(pt => pt.slug === a)!;
        const typeB = PERSONALITY_TYPES.find(pt => pt.slug === b)!;
        return typeA.priority_order - typeB.priority_order;
      });
      return sortedByPriority[0];
    }

    return primarySlug;
  }

  /**
   * Determine secondary personality types from score breakdown
   */
  static determineSecondaryPersonalities(
    scoreBreakdown: ScoreBreakdown,
    primarySlug: PersonalityTypeSlug,
    threshold: number = 10
  ): PersonalityTypeSlug[] {
    const secondaryTypes: PersonalityTypeSlug[] = [];

    Object.entries(scoreBreakdown).forEach(([slug, data]) => {
      if (slug !== primarySlug && data.percentage >= threshold) {
        secondaryTypes.push(slug as PersonalityTypeSlug);
      }
    });

    // Sort by percentage descending
    return secondaryTypes.sort((a, b) => {
      return scoreBreakdown[b].percentage - scoreBreakdown[a].percentage;
    });
  }

  /**
   * Generate a random share token
   */
  static generateShareToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
}
