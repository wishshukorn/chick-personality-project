# Data Structure

## Document Information
- **Project**: ChickPersonality
- **Based on**: Data Model (Step 4)
- **Version**: 1.0
- **Last Updated**: 2026-05-26

---

## 1. Enums and Constants

### DeviceType
```typescript
enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}
```

### EventType
```typescript
enum EventType {
  PAGE_VIEW = 'page_view',
  TEST_STARTED = 'test_started',
  QUESTION_ANSWERED = 'question_answered',
  TEST_COMPLETED = 'test_completed',
  TEST_ABANDONED = 'test_abandoned',
  SHARE_CLICKED = 'share_clicked',
  SHARE_COMPLETED = 'share_completed',
  LINK_COPIED = 'link_copied'
}
```

### PersonalityTypeSlug
```typescript
enum PersonalityTypeSlug {
  BOLD_EXPLORER = 'bold-explorer',
  WISE_GUARDIAN = 'wise-guardian',
  CREATIVE_SPARK = 'creative-spark',
  SOCIAL_BUTTERFLY = 'social-butterfly',
  QUIET_OBSERVER = 'quiet-observer',
  NATURAL_LEADER = 'natural-leader',
  GENTLE_PEACEMAKER = 'gentle-peacemaker'
}
```

### Constants
```typescript
// Personality Types
const PERSONALITY_TYPE_COUNT = 7;
const MIN_PRIORITY_ORDER = 1;
const MAX_PRIORITY_ORDER = 7;

// Questions
const MIN_QUESTION_NUMBER = 1;
const MAX_QUESTION_NUMBER = 30;
const MIN_ACTIVE_QUESTIONS = 20;
const MAX_QUESTION_TEXT_LENGTH = 500;

// Answer Options
const MIN_ANSWER_OPTIONS = 4;
const MAX_ANSWER_OPTIONS = 5;
const MIN_OPTION_ORDER = 1;
const MAX_OPTION_ORDER = 5;
const MAX_OPTION_TEXT_LENGTH = 255;
const MAX_WEIGHT_VALUE = 10;

// Test Results
const SHARE_TOKEN_LENGTH = 32;
const MIN_TEST_TIME_SECONDS = 1;
const TEST_RESULT_RETENTION_DAYS = 90;

// Share Links
const SHARE_LINK_EXPIRY_DAYS = 30;

// Analytics
const ANALYTICS_RETENTION_DAYS = 365;
const SESSION_ID_LENGTH = 64;
const IP_HASH_LENGTH = 64;
```

---

## 2. Entity: PersonalityType

### Schema Definition
```typescript
interface PersonalityType {
  id: string; // UUID
  name: string; // VARCHAR(100)
  slug: PersonalityTypeSlug; // VARCHAR(50)
  theme: string; // VARCHAR(100)
  color_palette: ColorPalette; // JSON
  icon_url: string | null; // VARCHAR(500)
  traits: string[]; // TEXT (comma-separated)
  description: string; // TEXT
  strengths: string[]; // TEXT (comma-separated)
  weaknesses: string[]; // TEXT (comma-separated)
  compatibility_matrix: CompatibilityMatrix; // JSON
  priority_order: number; // INTEGER (1-7)
  is_active: boolean; // BOOLEAN
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}

interface ColorPalette {
  primary: string; // HEX color
  secondary: string; // HEX color
  accent?: string; // HEX color (optional)
  background?: string; // HEX color (optional)
  text?: string; // HEX color (optional)
}

interface CompatibilityMatrix {
  [personalitySlug: string]: {
    score: number; // 0-100 compatibility score
    description: string; // Brief explanation
  };
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| name | string | Yes | 3 | 100 | ^[A-Za-z\s'-]+$ | Must be unique |
| slug | string | Yes | 3 | 50 | ^[a-z-]+$ | Must be unique, kebab-case |
| theme | string | Yes | 10 | 100 | ^[A-Za-z\s,.-]+$ | - |
| color_palette | object | Yes | - | - | - | Must include primary and secondary colors (HEX) |
| icon_url | string | No | - | 500 | ^https?://.+$ | Valid URL if provided |
| traits | array | Yes | 3 | 10 | - | Each trait 2-20 characters |
| description | string | Yes | 50 | 2000 | - | - |
| strengths | array | Yes | 3 | 5 | - | Each strength 10-100 characters |
| weaknesses | array | Yes | 3 | 5 | - | Each weakness 10-100 characters |
| compatibility_matrix | object | Yes | 7 | 7 | - | Must include all 7 personality types |
| priority_order | number | Yes | 1 | 7 | - | Must be unique |
| is_active | boolean | Yes | - | - | - | Default: true |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| updated_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Personality Type DTO
interface CreatePersonalityTypeDTO {
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

// Update Personality Type DTO
interface UpdatePersonalityTypeDTO {
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

// Personality Type Response DTO
interface PersonalityTypeResponseDTO {
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

// Personality Type List DTO
interface PersonalityTypeListDTO {
  data: PersonalityTypeResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}
```

### Sample Data
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "The Bold Explorer",
  "slug": "bold-explorer",
  "theme": "Adventure, curiosity, spontaneity",
  "color_palette": {
    "primary": "#FF6B35",
    "secondary": "#F7931E",
    "accent": "#FFD23F",
    "background": "#FFF8F0",
    "text": "#2D2D2D"
  },
  "icon_url": "https://example.com/icons/bold-explorer.svg",
  "traits": ["Energetic", "Optimistic", "Risk-taker", "Adaptable"],
  "description": "The Bold Explorer thrives on adventure and new experiences. Always curious and ready to take risks, this personality type embraces change with enthusiasm and inspires others to step out of their comfort zones.",
  "strengths": [
    "Embraces change and uncertainty",
    "Inspires others with enthusiasm",
    "Quick learner and adaptable",
    "Brings energy to any situation"
  ],
  "weaknesses": [
    "Can be impulsive and hasty",
    "May struggle with routine and structure",
    "Easily bored without novelty",
    "Sometimes overlooks details"
  ],
  "compatibility_matrix": {
    "bold-explorer": {"score": 100, "description": "Perfect match - shared love of adventure"},
    "wise-guardian": {"score": 60, "description": "Balancing dynamic - explorer needs grounding"},
    "creative-spark": {"score": 85, "description": "Great creative synergy"},
    "social-butterfly": {"score": 90, "description": "Excellent social chemistry"},
    "quiet-observer": {"score": 50, "description": "Challenging but complementary"},
    "natural-leader": {"score": 75, "description": "Strong partnership potential"},
    "gentle-peacemaker": {"score": 55, "description": "Needs patience and understanding"}
  },
  "priority_order": 1,
  "is_active": true,
  "created_at": "2026-05-26T00:00:00Z",
  "updated_at": "2026-05-26T00:00:00Z"
}
```

---

## 3. Entity: Question

### Schema Definition
```typescript
interface Question {
  id: string; // UUID
  question_text: string; // TEXT
  question_number: number; // INTEGER (1-30)
  category: string | null; // VARCHAR(50)
  is_active: boolean; // BOOLEAN
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| question_text | string | Yes | 10 | 500 | ^[A-Za-z0-9\s?.,!'-]+$ | Must end with question mark |
| question_number | number | Yes | 1 | 30 | - | Must be unique |
| category | string | No | - | 50 | ^[a-z-]+$ | Optional, kebab-case if provided |
| is_active | boolean | Yes | - | - | - | Default: true |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| updated_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Question DTO
interface CreateQuestionDTO {
  question_text: string;
  question_number: number;
  category?: string;
  is_active?: boolean;
}

// Update Question DTO
interface UpdateQuestionDTO {
  question_text?: string;
  category?: string;
  is_active?: boolean;
}

// Question Response DTO
interface QuestionResponseDTO {
  id: string;
  question_text: string;
  question_number: number;
  category: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Question List DTO
interface QuestionListDTO {
  data: QuestionResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}

// Question with Options DTO (for test display)
interface QuestionWithOptionsDTO extends QuestionResponseDTO {
  answer_options: AnswerOptionResponseDTO[];
}
```

### Sample Data
```json
{
  "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "question_text": "When faced with a new challenge, what's your first instinct?",
  "question_number": 1,
  "category": "approach-to-challenges",
  "is_active": true,
  "created_at": "2026-05-26T00:00:00Z",
  "updated_at": "2026-05-26T00:00:00Z"
}
```

---

## 4. Entity: AnswerOption

### Schema Definition
```typescript
interface AnswerOption {
  id: string; // UUID
  question_id: string; // UUID (FK)
  option_text: string; // VARCHAR(255)
  option_order: number; // INTEGER (1-5)
  scoring_weights: ScoringWeights; // JSON
  is_active: boolean; // BOOLEAN
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}

interface ScoringWeights {
  [personalitySlug: string]: number; // Weight value (0-10)
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| question_id | string | Yes | - | - | UUID v4 format | Must reference valid Question |
| option_text | string | Yes | 5 | 255 | ^[A-Za-z0-9\s.,!'-]+$ | - |
| option_order | number | Yes | 1 | 5 | - | Must be unique within question |
| scoring_weights | object | Yes | 7 | 7 | - | Must include all active personality types, values 0-10 |
| is_active | boolean | Yes | - | - | - | Default: true |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| updated_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Answer Option DTO
interface CreateAnswerOptionDTO {
  question_id: string;
  option_text: string;
  option_order: number;
  scoring_weights: ScoringWeights;
  is_active?: boolean;
}

// Update Answer Option DTO
interface UpdateAnswerOptionDTO {
  option_text?: string;
  scoring_weights?: ScoringWeights;
  is_active?: boolean;
}

// Answer Option Response DTO
interface AnswerOptionResponseDTO {
  id: string;
  question_id: string;
  option_text: string;
  option_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Answer Option List DTO
interface AnswerOptionListDTO {
  data: AnswerOptionResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}
```

### Sample Data
```json
{
  "id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8",
  "question_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "option_text": "Dive right in and figure it out as I go",
  "option_order": 1,
  "scoring_weights": {
    "bold-explorer": 10,
    "wise-guardian": 2,
    "creative-spark": 8,
    "social-butterfly": 6,
    "quiet-observer": 1,
    "natural-leader": 7,
    "gentle-peacemaker": 3
  },
  "is_active": true,
  "created_at": "2026-05-26T00:00:00Z",
  "updated_at": "2026-05-26T00:00:00Z"
}
```

---

## 5. Entity: TestResult

### Schema Definition
```typescript
interface TestResult {
  id: string; // UUID
  share_token: string; // VARCHAR(32)
  primary_personality_id: string; // UUID (FK)
  secondary_personality_ids: string[] | null; // JSON (array of UUIDs)
  score_breakdown: ScoreBreakdown; // JSON
  total_time_seconds: number; // INTEGER
  device_type: DeviceType; // VARCHAR(20)
  user_agent: string | null; // VARCHAR(500)
  ip_address_hash: string | null; // VARCHAR(64)
  completed_at: Date; // TIMESTAMP
  created_at: Date; // TIMESTAMP
}

interface ScoreBreakdown {
  [personalitySlug: string]: {
    percentage: number; // 0-100
    raw_score: number; // Raw points
  };
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| share_token | string | Yes | 32 | 32 | ^[a-zA-Z0-9]{32}$ | Must be unique, cryptographically random |
| primary_personality_id | string | Yes | - | - | UUID v4 format | Must reference valid PersonalityType |
| secondary_personality_ids | array | No | 0 | 6 | UUID v4 format | Array of valid PersonalityType IDs |
| score_breakdown | object | Yes | 7 | 7 | - | Must include all 7 types, percentages sum to 100% ± 1% |
| total_time_seconds | number | Yes | 1 | - | - | Must be positive integer |
| device_type | string | Yes | - | - | ^mobile\|tablet\|desktop$ | Must be valid DeviceType enum |
| user_agent | string | No | - | 500 | - | Valid user agent string if provided |
| ip_address_hash | string | No | 64 | 64 | ^[a-f0-9]{64}$ | SHA-256 hash if provided |
| completed_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Test Result DTO (internal use)
interface CreateTestResultDTO {
  primary_personality_id: string;
  secondary_personality_ids?: string[];
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  user_agent?: string;
  ip_address_hash?: string;
}

// Test Result Response DTO
interface TestResultResponseDTO {
  id: string;
  share_token: string;
  primary_personality: PersonalityTypeResponseDTO;
  secondary_personalities: PersonalityTypeResponseDTO[];
  score_breakdown: ScoreBreakdown;
  total_time_seconds: number;
  device_type: DeviceType;
  completed_at: Date;
}

// Test Result Public DTO (for sharing)
interface TestResultPublicDTO {
  share_token: string;
  primary_personality: PersonalityTypeResponseDTO;
  secondary_personalities: PersonalityTypeResponseDTO[];
  score_breakdown: ScoreBreakdown;
  completed_at: Date;
}

// Test Result List DTO
interface TestResultListDTO {
  data: TestResultResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}
```

### Sample Data
```json
{
  "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
  "primary_personality_id": "550e8400-e29b-41d4-a716-446655440000",
  "secondary_personality_ids": [
    "7c8e9a0b-1d2e-3f4a-5b6c-7d8e9f0a1b2c"
  ],
  "score_breakdown": {
    "bold-explorer": {"percentage": 85, "raw_score": 42},
    "wise-guardian": {"percentage": 45, "raw_score": 22},
    "creative-spark": {"percentage": 70, "raw_score": 35},
    "social-butterfly": {"percentage": 60, "raw_score": 30},
    "quiet-observer": {"percentage": 30, "raw_score": 15},
    "natural-leader": {"percentage": 55, "raw_score": 27},
    "gentle-peacemaker": {"percentage": 35, "raw_score": 17}
  },
  "total_time_seconds": 245,
  "device_type": "mobile",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
  "ip_address_hash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
  "completed_at": "2026-05-26T00:04:05Z",
  "created_at": "2026-05-26T00:00:00Z"
}
```

---

## 6. Entity: TestAnswer

### Schema Definition
```typescript
interface TestAnswer {
  id: string; // UUID
  test_result_id: string; // UUID (FK)
  question_id: string; // UUID (FK)
  answer_option_id: string; // UUID (FK)
  answered_at: Date; // TIMESTAMP
  created_at: Date; // TIMESTAMP
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| test_result_id | string | Yes | - | - | UUID v4 format | Must reference valid TestResult |
| question_id | string | Yes | - | - | UUID v4 format | Must reference valid Question |
| answer_option_id | string | Yes | - | - | UUID v4 format | Must reference valid AnswerOption for the question |
| answered_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Test Answer DTO
interface CreateTestAnswerDTO {
  test_result_id: string;
  question_id: string;
  answer_option_id: string;
}

// Test Answer Response DTO
interface TestAnswerResponseDTO {
  id: string;
  test_result_id: string;
  question_id: string;
  answer_option_id: string;
  answered_at: Date;
}

// Test Answer List DTO
interface TestAnswerListDTO {
  data: TestAnswerResponseDTO[];
  total: number;
}

// Bulk Create Test Answers DTO
interface BulkCreateTestAnswersDTO {
  test_result_id: string;
  answers: Array<{
    question_id: string;
    answer_option_id: string;
  }>;
}
```

### Sample Data
```json
{
  "id": "b1f2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  "test_result_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "question_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "answer_option_id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8",
  "answered_at": "2026-05-26T00:00:15Z",
  "created_at": "2026-05-26T00:00:15Z"
}
```

---

## 7. Entity: ShareLink

### Schema Definition
```typescript
interface ShareLink {
  id: string; // UUID
  test_result_id: string; // UUID (FK, Unique)
  share_url: string; // VARCHAR(500)
  share_token: string; // VARCHAR(32)
  click_count: number; // INTEGER
  last_clicked_at: Date | null; // TIMESTAMP
  expires_at: Date; // TIMESTAMP
  created_at: Date; // TIMESTAMP
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| test_result_id | string | Yes | - | - | UUID v4 format | Must reference valid TestResult, must be unique |
| share_url | string | Yes | - | 500 | ^https?://.+$ | Must be unique, valid URL |
| share_token | string | Yes | 32 | 32 | ^[a-zA-Z0-9]{32}$ | Must match TestResult.share_token |
| click_count | number | Yes | 0 | - | - | Default: 0, non-negative |
| last_clicked_at | Date | No | - | - | ISO 8601 | Nullable |
| expires_at | Date | Yes | - | - | ISO 8601 | Must be 30 days after created_at |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Share Link DTO (internal use)
interface CreateShareLinkDTO {
  test_result_id: string;
  share_url: string;
  share_token: string;
  expires_at: Date;
}

// Share Link Response DTO
interface ShareLinkResponseDTO {
  id: string;
  share_url: string;
  share_token: string;
  click_count: number;
  last_clicked_at: Date | null;
  expires_at: Date;
  created_at: Date;
}

// Share Link List DTO
interface ShareLinkListDTO {
  data: ShareLinkResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}
```

### Sample Data
```json
{
  "id": "c2d3e4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f",
  "test_result_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "share_url": "https://chickpersonality.com/result/xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
  "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
  "click_count": 15,
  "last_clicked_at": "2026-05-26T12:30:00Z",
  "expires_at": "2026-06-25T00:00:00Z",
  "created_at": "2026-05-26T00:00:00Z"
}
```

---

## 8. Entity: AnalyticsEvent

### Schema Definition
```typescript
interface AnalyticsEvent {
  id: string; // UUID
  event_type: EventType; // VARCHAR(50)
  event_data: Record<string, any> | null; // JSON
  personality_type_slug: PersonalityTypeSlug | null; // VARCHAR(50)
  device_type: DeviceType | null; // VARCHAR(20)
  session_id: string | null; // VARCHAR(64)
  ip_address_hash: string | null; // VARCHAR(64)
  occurred_at: Date; // TIMESTAMP
  created_at: Date; // TIMESTAMP
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| event_type | string | Yes | - | - | ^[a-z_]+$ | Must be valid EventType enum |
| event_data | object | No | - | - | - | JSON object if provided |
| personality_type_slug | string | No | - | 50 | ^[a-z-]+$ | Must be valid PersonalityTypeSlug if provided |
| device_type | string | No | - | - | ^mobile\|tablet\|desktop$ | Must be valid DeviceType if provided |
| session_id | string | No | 64 | 64 | ^[a-zA-Z0-9]{64}$ | Random UUID if provided |
| ip_address_hash | string | No | 64 | 64 | ^[a-f0-9]{64}$ | SHA-256 hash if provided |
| occurred_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Analytics Event DTO
interface CreateAnalyticsEventDTO {
  event_type: EventType;
  event_data?: Record<string, any>;
  personality_type_slug?: PersonalityTypeSlug;
  device_type?: DeviceType;
  session_id?: string;
  ip_address_hash?: string;
}

// Analytics Event Response DTO
interface AnalyticsEventResponseDTO {
  id: string;
  event_type: EventType;
  event_data: Record<string, any> | null;
  personality_type_slug: PersonalityTypeSlug | null;
  device_type: DeviceType | null;
  session_id: string | null;
  occurred_at: Date;
}

// Analytics Event List DTO
interface AnalyticsEventListDTO {
  data: AnalyticsEventResponseDTO[];
  total: number;
  page: number;
  page_size: number;
}

// Analytics Aggregation DTO
interface AnalyticsAggregationDTO {
  event_type: EventType;
  count: number;
  by_personality_type: Record<PersonalityTypeSlug, number>;
  by_device_type: Record<DeviceType, number>;
  date_range: {
    start: Date;
    end: Date;
  };
}
```

### Sample Data
```json
{
  "id": "d3e4f5g6-h7i8-4j9k-0l1m-2n3o4p5q6r7s",
  "event_type": "test_completed",
  "event_data": {
    "question_count": 25,
    "total_time_seconds": 245
  },
  "personality_type_slug": "bold-explorer",
  "device_type": "mobile",
  "session_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
  "ip_address_hash": "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3",
  "occurred_at": "2026-05-26T00:04:05Z",
  "created_at": "2026-05-26T00:04:05Z"
}
```

---

## 9. Entity: Configuration

### Schema Definition
```typescript
interface Configuration {
  id: string; // UUID
  config_key: string; // VARCHAR(100)
  config_value: string; // TEXT
  description: string | null; // VARCHAR(500)
  is_public: boolean; // BOOLEAN
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Pattern | Custom Rules |
|-------|------|----------|-----|-----|---------|--------------|
| id | string | Yes | - | - | UUID v4 format | Must be valid UUID |
| config_key | string | Yes | 3 | 100 | ^[a-z_.-]+$ | Must be unique, kebab-case or snake_case |
| config_value | string | Yes | 1 | 10000 | - | Can be JSON string for complex values |
| description | string | No | - | 500 | - | - |
| is_public | boolean | Yes | - | - | - | Default: false |
| created_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |
| updated_at | Date | Yes | - | - | ISO 8601 | Default: current timestamp |

### DTOs
```typescript
// Create Configuration DTO
interface CreateConfigurationDTO {
  config_key: string;
  config_value: string;
  description?: string;
  is_public?: boolean;
}

// Update Configuration DTO
interface UpdateConfigurationDTO {
  config_value?: string;
  description?: string;
  is_public?: boolean;
}

// Configuration Response DTO
interface ConfigurationResponseDTO {
  id: string;
  config_key: string;
  config_value: string;
  description: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

// Configuration List DTO
interface ConfigurationListDTO {
  data: ConfigurationResponseDTO[];
  total: number;
}

// Public Configuration DTO (for frontend)
interface PublicConfigurationDTO {
  config_key: string;
  config_value: string;
}
```

### Sample Data
```json
{
  "id": "e4f5g6h7-i8j9-4k0l-1m2n-3o4p5q6r7s8t",
  "config_key": "test.question_count",
  "config_value": "25",
  "description": "Number of questions in the personality test",
  "is_public": true,
  "created_at": "2026-05-26T00:00:00Z",
  "updated_at": "2026-05-26T00:00:00Z"
}
```

---

## 10. Database Indexes

| Entity | Index Name | Fields | Type | Purpose |
|--------|------------|--------|------|---------|
| PersonalityType | idx_personality_type_active_priority | is_active, priority_order | BTREE | Query active types in priority order |
| PersonalityType | idx_personality_type_slug | slug | BTREE | Lookup by slug |
| Question | idx_question_active_number | is_active, question_number | BTREE | Query active questions in order |
| Question | idx_question_category | category | BTREE | Filter by category |
| AnswerOption | idx_answer_option_question_active_order | question_id, is_active, option_order | BTREE | Query active options for a question |
| AnswerOption | idx_answer_option_question | question_id | BTREE | Foreign key lookup |
| TestResult | idx_test_result_share_token | share_token | BTREE | Share token lookup |
| TestResult | idx_test_result_primary_personality | primary_personality_id, completed_at | BTREE | Analytics by personality type |
| TestResult | idx_test_result_completed_at | completed_at | BTREE | Cleanup by date |
| TestAnswer | idx_test_answer_result_question | test_result_id, question_id | BTREE | Lookup answers for a result |
| TestAnswer | idx_test_answer_result | test_result_id | BTREE | Foreign key lookup |
| TestAnswer | idx_test_answer_question | question_id | BTREE | Analytics by question |
| ShareLink | idx_share_link_token | share_token | BTREE | Share token lookup |
| ShareLink | idx_share_link_expires_at | expires_at | BTREE | Cleanup expired links |
| AnalyticsEvent | idx_analytics_event_type_time | event_type, occurred_at | BTREE | Analytics queries |
| AnalyticsEvent | idx_analytics_session | session_id, occurred_at | BTREE | Session tracking |
| AnalyticsEvent | idx_analytics_occurred_at | occurred_at | BTREE | Cleanup by date |
| Configuration | idx_configuration_key | config_key | BTREE | Config key lookup |
| Configuration | idx_configuration_public | is_public | BTREE | Query public configs |

---

## 11. Common DTOs

### Pagination DTO
```typescript
interface PaginationDTO {
  page: number;
  page_size: number;
  total: number;
}

interface PaginationParams {
  page?: number;
  page_size?: number;
}
```

### Error Response DTO
```typescript
interface ErrorResponseDTO {
  error: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}
```

### Success Response DTO
```typescript
interface SuccessResponseDTO<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: Date;
}
```

---

## 12. Validation Helper Functions

```typescript
// UUID Validation
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// HEX Color Validation
function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

// Share Token Validation
function isValidShareToken(token: string): boolean {
  const tokenRegex = /^[a-zA-Z0-9]{32}$/;
  return tokenRegex.test(token);
}

// IP Hash Validation
function isValidIPHash(hash: string): boolean {
  const hashRegex = /^[a-f0-9]{64}$/;
  return hashRegex.test(hash);
}

// Score Breakdown Validation
function isValidScoreBreakdown(breakdown: ScoreBreakdown): boolean {
  const slugs = Object.keys(breakdown);
  const totalPercentage = Object.values(breakdown).reduce((sum, item) => sum + item.percentage, 0);
  
  // Must have exactly 7 personality types
  if (slugs.length !== 7) return false;
  
  // Percentages must sum to 100% ± 1%
  if (totalPercentage < 99 || totalPercentage > 101) return false;
  
  // All percentages must be between 0 and 100
  for (const item of Object.values(breakdown)) {
    if (item.percentage < 0 || item.percentage > 100) return false;
  }
  
  return true;
}

// Scoring Weights Validation
function isValidScoringWeights(weights: ScoringWeights, activeTypes: PersonalityTypeSlug[]): boolean {
  const slugs = Object.keys(weights);
  
  // Must have all active personality types
  if (slugs.length !== activeTypes.length) return false;
  
  // All weights must be non-negative integers
  for (const weight of Object.values(weights)) {
    if (!Number.isInteger(weight) || weight < 0 || weight > 10) return false;
  }
  
  return true;
}
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-26  
**Status**: Draft - Ready for Review
