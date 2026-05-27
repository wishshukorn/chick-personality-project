import { create } from 'zustand';
import { TestAnswer, TestResult, DeviceType } from '../../../shared/types';
import { ScoringService } from '../services/scoringService';
import { getPersonalityBySlug } from '../../../infrastructure/constants/personalityTypes';

interface TestState {
  currentQuestionIndex: number;
  answers: TestAnswer[];
  startTime: number | null;
  testResult: TestResult | null;
  isComplete: boolean;
  
  // Actions
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answerOptionId: string) => void;
  startTest: () => void;
  completeTest: () => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>((set, get) => ({
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  testResult: null,
  isComplete: false,

  setCurrentQuestionIndex: (index: number) => {
    set({ currentQuestionIndex: index });
  },

  setAnswer: (questionId: string, answerOptionId: string) => {
    const { answers } = get();
    const existingAnswerIndex = answers.findIndex(a => a.question_id === questionId);
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { question_id: questionId, answer_option_id: answerOptionId };
      set({ answers: updatedAnswers });
    } else {
      // Add new answer
      set({ answers: [...answers, { question_id: questionId, answer_option_id: answerOptionId }] });
    }
  },

  startTest: () => {
    set({
      currentQuestionIndex: 0,
      answers: [],
      startTime: Date.now(),
      testResult: null,
      isComplete: false,
    });
  },

  completeTest: () => {
    const { answers, startTime } = get();
    if (!startTime) return;

    const totalTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const scoreBreakdown = ScoringService.calculateScores(answers);
    const primarySlug = ScoringService.determinePrimaryPersonality(scoreBreakdown);
    const secondarySlugs = ScoringService.determineSecondaryPersonalities(scoreBreakdown, primarySlug);

    const primaryPersonality = getPersonalityBySlug(primarySlug);
    const secondaryPersonalities = secondarySlugs.map(slug => getPersonalityBySlug(slug));
    const shareToken = ScoringService.generateShareToken();

    const testResult: TestResult = {
      id: crypto.randomUUID(),
      share_token: shareToken,
      primary_personality: primaryPersonality,
      secondary_personalities: secondaryPersonalities,
      score_breakdown: scoreBreakdown,
      total_time_seconds: totalTimeSeconds,
      device_type: DeviceType.DESKTOP, // TODO: Detect actual device type
      completed_at: new Date(),
    };

    set({
      testResult,
      isComplete: true,
    });
  },

  resetTest: () => {
    set({
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      testResult: null,
      isComplete: false,
    });
  },
}));
