/**
 * Scoring Service
 * Calculates personality scores based on test answers
 */

import { PersonalityTypeSlug, ScoringWeights, ScoreBreakdown } from '../../shared/types/entities';

export class ScoringService {
  /**
   * Calculate personality scores from test answers
   * @param answers - Array of answer option IDs with their scoring weights
   * @returns Score breakdown for all personality types
   */
  calculateScores(answers: Array<{ scoring_weights: ScoringWeights }>): ScoreBreakdown {
    const scores: Record<PersonalityTypeSlug, number> = {
      [PersonalityTypeSlug.BOLD_EXPLORER]: 0,
      [PersonalityTypeSlug.WISE_GUARDIAN]: 0,
      [PersonalityTypeSlug.CREATIVE_SPARK]: 0,
      [PersonalityTypeSlug.SOCIAL_BUTTERFLY]: 0,
      [PersonalityTypeSlug.QUIET_OBSERVER]: 0,
      [PersonalityTypeSlug.NATURAL_LEADER]: 0,
      [PersonalityTypeSlug.GENTLE_PEACEMAKER]: 0,
    };

    // Sum up scores from all answers
    for (const answer of answers) {
      const weights = typeof answer.scoring_weights === 'string' 
        ? JSON.parse(answer.scoring_weights) 
        : answer.scoring_weights;
      
      for (const [slug, weight] of Object.entries(weights)) {
        if (slug in scores) {
          scores[slug as PersonalityTypeSlug] += weight as number;
        }
      }
    }

    // Calculate percentages
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const breakdown: ScoreBreakdown = {};

    for (const [slug, rawScore] of Object.entries(scores)) {
      breakdown[slug as PersonalityTypeSlug] = {
        percentage: totalScore > 0 ? (rawScore / totalScore) * 100 : 0,
        raw_score: rawScore,
      };
    }

    return breakdown;
  }

  /**
   * Determine primary personality from score breakdown
   * @param scoreBreakdown - Score breakdown from calculateScores
   * @returns The personality type slug with the highest score
   */
  determinePrimaryPersonality(scoreBreakdown: ScoreBreakdown): PersonalityTypeSlug {
    let maxScore = 0;
    let primaryPersonality: PersonalityTypeSlug = PersonalityTypeSlug.BOLD_EXPLORER;

    for (const [slug, data] of Object.entries(scoreBreakdown)) {
      if (data.raw_score > maxScore) {
        maxScore = data.raw_score;
        primaryPersonality = slug as PersonalityTypeSlug;
      }
    }

    return primaryPersonality;
  }

  /**
   * Determine secondary personalities (top 2-3 after primary)
   * @param scoreBreakdown - Score breakdown from calculateScores
   * @param primarySlug - The primary personality slug (excluded from results)
   * @param count - Number of secondary personalities to return (default: 2)
   * @returns Array of secondary personality slugs
   */
  determineSecondaryPersonalities(
    scoreBreakdown: ScoreBreakdown,
    primarySlug: PersonalityTypeSlug,
    count: number = 2
  ): PersonalityTypeSlug[] {
    const sorted = Object.entries(scoreBreakdown)
      .filter(([slug]) => slug !== primarySlug)
      .sort(([, a], [, b]) => b.raw_score - a.raw_score)
      .slice(0, count)
      .map(([slug]) => slug as PersonalityTypeSlug);

    return sorted;
  }

  /**
   * Validate that scoring weights sum to a reasonable value
   * @param weights - Scoring weights object
   * @returns true if valid
   */
  validateScoringWeights(weights: ScoringWeights): boolean {
    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
    // Total weight should be between 7 and 35 (1-5 per personality type)
    return totalWeight >= 7 && totalWeight <= 35;
  }
}
