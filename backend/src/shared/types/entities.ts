/**
 * Entity Types
 * Core entity definitions based on data structure specification
 */

// Enums
export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export enum EventType {
  PAGE_VIEW = 'page_view',
  TEST_STARTED = 'test_started',
  QUESTION_ANSWERED = 'question_answered',
  TEST_COMPLETED = 'test_completed',
  TEST_ABANDONED = 'test_abandoned',
  SHARE_CLICKED = 'share_clicked',
  SHARE_COMPLETED = 'share_completed',
  LINK_COPIED = 'link_copied'
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

// Interfaces
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
  created_at: Date;
  updated_at: Date;
}

export interface Question {
  id: string;
  question_text: string;
  question_number: number;
  category: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ScoringWeights {
  [personalitySlug: string]: number;
}

export interface AnswerOption {
  id: string;
  question_id: string;
  option_text: string;
  option_order: number;
  scoring_weights: ScoringWeights;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
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
  primary_personality_id: string;
  secondary_personality_ids: string[] | null;
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  user_agent: string | null;
  ip_address_hash: string | null;
  completed_at: Date;
  created_at: Date;
}

export interface TestAnswer {
  id: string;
  test_result_id: string;
  question_id: string;
  answer_option_id: string;
  answered_at: Date;
  created_at: Date;
}

export interface ShareLink {
  id: string;
  test_result_id: string;
  share_url: string;
  share_token: string;
  click_count: number;
  last_clicked_at: Date | null;
  expires_at: Date;
  created_at: Date;
}

export interface AnalyticsEvent {
  id: string;
  event_type: EventType;
  event_data: Record<string, any> | null;
  personality_type_slug: PersonalityTypeSlug | null;
  device_type: DeviceType | null;
  session_id: string | null;
  ip_address_hash: string | null;
  occurred_at: Date;
  created_at: Date;
}

export interface TestSession {
  id: string;
  device_type: DeviceType;
  user_agent: string | null;
  ip_address_hash: string | null;
  started_at: Date;
  expires_at: Date;
  created_at: Date;
}

export interface Configuration {
  id: string;
  config_key: string;
  config_value: string;
  description: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

// DTOs
export interface CreatePersonalityTypeDTO {
  name: string;
  slug: PersonalityTypeSlug;
  theme: string;
  color_palette: ColorPalette;
  icon_url?: string;
  traits: string[];
  description: string;
  strengths: string[];
  weaknesses: string[];
  compatibility_matrix: CompatibilityMatrix;
  priority_order: number;
  is_active?: boolean;
}

export interface UpdatePersonalityTypeDTO {
  name?: string;
  theme?: string;
  color_palette?: ColorPalette;
  icon_url?: string;
  traits?: string[];
  description?: string;
  strengths?: string[];
  weaknesses?: string[];
  compatibility_matrix?: CompatibilityMatrix;
  is_active?: boolean;
}

export interface PersonalityTypeResponseDTO {
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

export interface CreateQuestionDTO {
  question_text: string;
  question_number: number;
  category?: string;
  is_active?: boolean;
}

export interface UpdateQuestionDTO {
  question_text?: string;
  category?: string;
  is_active?: boolean;
}

export interface QuestionResponseDTO {
  id: string;
  question_text: string;
  question_number: number;
  category: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionWithOptionsDTO extends QuestionResponseDTO {
  answer_options: AnswerOptionResponseDTO[];
}

export interface CreateAnswerOptionDTO {
  question_id: string;
  option_text: string;
  option_order: number;
  scoring_weights: ScoringWeights;
  is_active?: boolean;
}

export interface UpdateAnswerOptionDTO {
  option_text?: string;
  scoring_weights?: ScoringWeights;
  is_active?: boolean;
}

export interface AnswerOptionResponseDTO {
  id: string;
  question_id: string;
  option_text: string;
  option_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTestResultDTO {
  primary_personality_id: string;
  secondary_personality_ids?: string[];
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  user_agent?: string;
  ip_address_hash?: string;
}

export interface TestResultResponseDTO {
  id: string;
  share_token: string;
  primary_personality: PersonalityTypeResponseDTO;
  secondary_personalities: PersonalityTypeResponseDTO[];
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  completed_at: Date;
}

export interface TestResultPublicDTO {
  share_token: string;
  primary_personality: PersonalityTypeResponseDTO;
  secondary_personalities: PersonalityTypeResponseDTO[];
  score_breakdown: ScoreBreakdown;
  completed_at: Date;
}

export interface CreateTestAnswerDTO {
  test_result_id: string;
  question_id: string;
  answer_option_id: string;
}

export interface TestAnswerResponseDTO {
  id: string;
  test_result_id: string;
  question_id: string;
  answer_option_id: string;
  answered_at: Date;
}

export interface BulkCreateTestAnswersDTO {
  test_result_id: string;
  answers: Array<{
    question_id: string;
    answer_option_id: string;
  }>;
}

export interface CreateShareLinkDTO {
  test_result_id: string;
  share_url: string;
  share_token: string;
  expires_at: Date;
}

export interface ShareLinkResponseDTO {
  id: string;
  share_url: string;
  share_token: string;
  click_count: number;
  last_clicked_at: Date | null;
  expires_at: Date;
  created_at: Date;
}

export interface CreateAnalyticsEventDTO {
  event_type: EventType;
  event_data?: Record<string, any>;
  personality_type_slug?: PersonalityTypeSlug;
  device_type?: DeviceType;
  session_id?: string;
  ip_address_hash?: string;
}

export interface AnalyticsEventResponseDTO {
  id: string;
  event_type: EventType;
  event_data: Record<string, any> | null;
  personality_type_slug: PersonalityTypeSlug | null;
  device_type: DeviceType | null;
  session_id: string | null;
  occurred_at: Date;
}

export interface AnalyticsAggregationDTO {
  event_type: EventType;
  count: number;
  by_personality_type: Record<PersonalityTypeSlug, number>;
  by_device_type: Record<DeviceType, number>;
  date_range: {
    start: Date;
    end: Date;
  };
}

export interface CreateConfigurationDTO {
  config_key: string;
  config_value: string;
  description?: string;
  is_public?: boolean;
}

export interface UpdateConfigurationDTO {
  config_value?: string;
  description?: string;
  is_public?: boolean;
}

export interface ConfigurationResponseDTO {
  id: string;
  config_key: string;
  config_value: string;
  description: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PublicConfigurationDTO {
  config_key: string;
  config_value: string;
}

export interface CreateTestSessionDTO {
  device_type: DeviceType;
  user_agent?: string;
  ip_address_hash?: string;
}

export interface UpdateTestSessionDTO {
  expires_at?: Date;
}

export interface TestSessionResponseDTO {
  id: string;
  device_type: DeviceType;
  started_at: Date;
  question_count: number;
}

export interface SubmitAnswerDTO {
  session_id: string;
  question_id: string;
  answer_option_id: string;
}

export interface SubmitAnswerResponseDTO {
  session_id: string;
  question_number: number;
  answered_at: Date;
  next_question_number: number;
}

export interface FinishTestDTO {
  session_id: string;
  answers: Array<{
    question_id: string;
    answer_option_id: string;
  }>;
  total_time_seconds: number;
}

// Common DTOs
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface PaginationDTO {
  page: number;
  page_size: number;
  total: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationDTO;
}

export interface ErrorResponseDTO {
  error: string;
  message: string;
  details?: Record<string, any>;
  requestId: string;
  timestamp: Date;
}

export interface SuccessResponseDTO<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: PaginationDTO;
    total?: number;
  };
  timestamp: Date;
}
