export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export enum PersonalityTypeSlug {
  BOLD_EXPLORER = 'bold-explorer',
  WISE_GUARDIAN = 'wise-guardian',
  CREATIVE_SPARK = 'creative-spark',
  SOCIAL_BUTTERFLY = 'social-butterfly',
  QUIET_OBSERVER = 'quiet-observer',
  NATURAL_LEADER = 'natural-leader',
  GENTLE_PEACEMAKER = 'gentle-peacemaker'
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent?: string;
  background?: string;
  text?: string;
}

export interface CompatibilityMatrix {
  [personalitySlug: string]: {
    score: number;
    description: string;
  };
}

export interface PersonalityType {
  id: string;
  name: string;
  slug: PersonalityTypeSlug;
  theme: string;
  color_palette: ColorPalette;
  icon_url: string | null;
  traits: string[];
  description: string;
  strengths: string[];
  weaknesses: string[];
  compatibility_matrix: CompatibilityMatrix;
  priority_order: number;
  is_active: boolean;
}

export interface Question {
  id: string;
  question_text: string;
  question_number: number;
  category: string | null;
  is_active: boolean;
}

export interface AnswerOption {
  id: string;
  question_id: string;
  option_text: string;
  option_order: number;
  scoring_weights: Record<PersonalityTypeSlug, number>;
  is_active: boolean;
}

export interface QuestionWithOptions extends Question {
  answer_options: AnswerOption[];
}

export interface ScoreBreakdown {
  [personalitySlug: string]: {
    percentage: number;
    raw_score: number;
  };
}

export interface TestResult {
  id: string;
  share_token: string;
  primary_personality: PersonalityType;
  secondary_personalities: PersonalityType[];
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  completed_at: Date;
}

export interface TestAnswer {
  question_id: string;
  answer_option_id: string;
}
