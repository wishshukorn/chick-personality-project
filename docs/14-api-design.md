# API Design

## Document Information
- **Project**: ChickPersonality
- **Based on**: Data Structure (Step 5), Function List (Step 7), Access Control Design (Step 9), Internal Module Design (Step 13)
- **Version**: 1.0
- **Last Updated**: 2026-05-27

---

## 1. API Overview

### Base URL
```
https://api.chickpersonality.com/v1
```

### Authentication
**Phase 1 (Current):**
- No authentication required
- All endpoints are publicly accessible
- Rate limiting based on IP address only

**Phase 2 (Future):**
- Bearer JWT authentication for protected endpoints
- Public endpoints remain accessible without authentication
- Token-based authorization with role-based access control

### Content-Type
```
Content-Type: application/json
Accept: application/json
```

### API Versioning Strategy
- **URL Versioning**: Version included in URL path (`/v1/`)
- **Backward Compatibility**: Major version changes will increment version number
- **Deprecation Policy**: Deprecated endpoints supported for minimum 6 months with warning headers
- **Version Headers**: Response includes `API-Version: 1.0` header

### Rate Limiting
**Phase 1 (Current):**
- **Global Rate Limit**: 100 requests per minute per IP address
- **Test Start Rate**: 10 requests per minute per IP address
- **Answer Submission Rate**: 60 requests per minute per IP address
- **Share Link Creation Rate**: 10 requests per minute per IP address
- **Image Generation Rate**: 5 requests per minute per IP address

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1716800000
X-RateLimit-Reset-After: 300
```

### CORS Configuration
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

---

## 2. Endpoint Catalog

| Method | Endpoint | Description | Auth | Permission | Rate Limit |
|--------|----------|-------------|------|------------|------------|
| GET | /questions | Get active questions with answer options | No | test:read | 60/min |
| POST | /test/start | Start a new test session | No | test:start | 10/min |
| POST | /test/answer | Submit answer for a question | No | test:answer | 60/min |
| POST | /test/finish | Complete test and calculate results | No | test:answer | 10/min |
| GET | /results/:shareToken | Retrieve test result by share token | No | result:view, share:access | 60/min |
| POST | /share/create | Create shareable link for results | No | result:share, share:create | 10/min |
| GET | /config/public | Retrieve public configuration | No | config:read | 60/min |
| POST | /image/generate | Generate shareable image card | No | result:image | 5/min |
| GET | /health | Health check endpoint | No | - | 100/min |

---

## 3. Endpoint Details

### GET /questions

**Description**: Retrieve all active questions with their answer options ordered by question number.

**Authentication**: Not required (Phase 1)

**Permission**: test:read (P-002)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Query Parameters:
  None
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "question_text": "When faced with a new challenge, what's your first instinct?",
      "question_number": 1,
      "category": "approach-to-challenges",
      "answer_options": [
        {
          "id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8",
          "option_text": "Dive right in and figure it out as I go",
          "option_order": 1
        },
        {
          "id": "1b2c3d40-9dad-11d1-80b4-00c04fd430c8",
          "option_text": "Plan carefully before taking action",
          "option_order": 2
        },
        {
          "id": "2c3d4e50-9dad-11d1-80b4-00c04fd430c8",
          "option_text": "Seek advice from others first",
          "option_order": 3
        },
        {
          "id": "3d4e5f60-9dad-11d1-80b4-00c04fd430c8",
          "option_text": "Wait and see how things develop",
          "option_order": 4
        }
      ]
    }
  ],
  "meta": {
    "total": 25,
    "timestamp": "2026-05-27T10:30:00Z"
  }
}
```

**Response 500 (Internal Server Error):**
```json
{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

---

### POST /test/start

**Description**: Initialize a new test session and return session ID.

**Authentication**: Not required (Phase 1)

**Permission**: test:start (P-001)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    "device_type": "mobile",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
  }
```

**Response 201 (Created):**
```json
{
  "success": true,
  "data": {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "started_at": "2026-05-27T10:30:00Z",
    "question_count": 25
  },
  "timestamp": "2026-05-27T10:30:00Z"
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid device type",
  "details": {
    "field": "device_type",
    "error": "Must be one of: mobile, tablet, desktop"
  },
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

---

### POST /test/answer

**Description**: Submit an answer for a specific question during the test session.

**Authentication**: Not required (Phase 1)

**Permission**: test:answer (P-003)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "question_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "answer_option_id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8"
  }
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "question_number": 1,
    "answered_at": "2026-05-27T10:30:15Z",
    "next_question_number": 2
  },
  "timestamp": "2026-05-27T10:30:15Z"
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Answer option does not belong to the specified question",
  "details": {
    "question_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "answer_option_id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8"
  },
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:15Z"
}
```

---

### POST /test/finish

**Description**: Complete the test, calculate personality scores, and generate results.

**Authentication**: Not required (Phase 1)

**Permission**: test:answer (P-003)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "answers": [
      {
        "question_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "answer_option_id": "9a7b8c10-9dad-11d1-80b4-00c04fd430c8"
      },
      {
        "question_id": "1b2c3d40-9dad-11d1-80b4-00c04fd430c8",
        "answer_option_id": "2c3d4e50-9dad-11d1-80b4-00c04fd430c8"
      }
    ],
    "total_time_seconds": 245
  }
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
    "primary_personality": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "The Bold Explorer",
      "slug": "bold-explorer",
      "theme": "Adventure, curiosity, spontaneity",
      "color_palette": {
        "primary": "#FF6B35",
        "secondary": "#F7931E",
        "accent": "#FFD23F"
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
        "wise-guardian": {"score": 60, "description": "Balancing dynamic - explorer needs grounding"}
      }
    },
    "secondary_personalities": [
      {
        "id": "7c8e9a0b-1d2e-3f4a-5b6c-7d8e9f0a1b2c",
        "name": "The Creative Spark",
        "slug": "creative-spark"
      }
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
    "completed_at": "2026-05-27T10:34:05Z"
  },
  "timestamp": "2026-05-27T10:34:05Z"
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Not all questions have been answered",
  "details": {
    "required": 25,
    "provided": 24
  },
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:34:05Z"
}
```

---

### GET /results/:shareToken

**Description**: Retrieve a test result by its share token (public access for sharing).

**Authentication**: Not required (Phase 1)

**Permission**: result:view (P-007), share:access (P-019)

**Request:**
```yaml
Headers:
  Accept: application/json

Path Parameters:
  shareToken: xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
    "primary_personality": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "The Bold Explorer",
      "slug": "bold-explorer",
      "theme": "Adventure, curiosity, spontaneity",
      "color_palette": {
        "primary": "#FF6B35",
        "secondary": "#F7931E",
        "accent": "#FFD23F"
      },
      "icon_url": "https://example.com/icons/bold-explorer.svg",
      "traits": ["Energetic", "Optimistic", "Risk-taker", "Adaptable"],
      "description": "The Bold Explorer thrives on adventure and new experiences.",
      "strengths": [
        "Embraces change and uncertainty",
        "Inspires others with enthusiasm"
      ],
      "weaknesses": [
        "Can be impulsive and hasty",
        "May struggle with routine and structure"
      ],
      "compatibility_matrix": {
        "bold-explorer": {"score": 100, "description": "Perfect match"},
        "wise-guardian": {"score": 60, "description": "Balancing dynamic"}
      }
    },
    "secondary_personalities": [
      {
        "id": "7c8e9a0b-1d2e-3f4a-5b6c-7d8e9f0a1b2c",
        "name": "The Creative Spark",
        "slug": "creative-spark"
      }
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
    "completed_at": "2026-05-27T10:34:05Z"
  },
  "timestamp": "2026-05-27T10:34:05Z"
}
```

**Response 404 (Not Found):**
```json
{
  "error": "NOT_FOUND",
  "message": "Test result not found or share token is invalid",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:34:05Z"
}
```

**Response 410 (Gone):**
```json
{
  "error": "GONE",
  "message": "This shared result has expired. Take the test to get new results.",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:34:05Z"
}
```

---

### POST /share/create

**Description**: Create a shareable link for a test result (if not already created).

**Authentication**: Not required (Phase 1)

**Permission**: result:share (P-008), share:create (P-020)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH"
  }
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "share_url": "https://chickpersonality.com/result/xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
    "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH",
    "expires_at": "2026-06-26T10:30:00Z",
    "created_at": "2026-05-27T10:30:00Z"
  },
  "timestamp": "2026-05-27T10:30:00Z"
}
```

**Response 404 (Not Found):**
```json
{
  "error": "NOT_FOUND",
  "message": "Test result not found for the provided share token",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

---

### GET /config/public

**Description**: Retrieve public configuration values for the frontend.

**Authentication**: Not required (Phase 1)

**Permission**: config:read (P-010)

**Request:**
```yaml
Headers:
  Accept: application/json

Query Parameters:
  None
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "test.question_count": "25",
    "test.min_time_seconds": "1",
    "test.max_time_seconds": "3600",
    "share.link_expiry_days": "30",
    "analytics.enabled": "true",
    "features.image_generation": "true"
  },
  "timestamp": "2026-05-27T10:30:00Z"
}
```

---

### POST /image/generate

**Description**: Generate a shareable image card for a test result.

**Authentication**: Not required (Phase 1)

**Permission**: result:image (P-009)

**Request:**
```yaml
Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    "share_token": "xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH"
  }
```

**Response 200 (OK):**
```json
{
  "success": true,
  "data": {
    "image_url": "https://cdn.chickpersonality.com/share-cards/xK9mN2pQ4rS6tU8vW0yZ2aB4cD6eF8gH.png",
    "generated_at": "2026-05-27T10:30:03Z",
    "expires_at": "2026-06-27T10:30:03Z"
  },
  "timestamp": "2026-05-27T10:30:03Z"
}
```

**Response 408 (Request Timeout):**
```json
{
  "error": "REQUEST_TIMEOUT",
  "message": "Image generation took too long. Please try again or use alternative sharing methods.",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:03Z"
}
```

**Response 404 (Not Found):**
```json
{
  "error": "NOT_FOUND",
  "message": "Test result not found for the provided share token",
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:03Z"
}
```

---

### GET /health

**Description**: Health check endpoint for monitoring and load balancer checks.

**Authentication**: Not required

**Permission**: None

**Request:**
```yaml
Headers:
  Accept: application/json
```

**Response 200 (OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-27T10:30:00Z",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "storage": "healthy"
  },
  "version": "1.0.0"
}
```

**Response 503 (Service Unavailable):**
```json
{
  "status": "unhealthy",
  "timestamp": "2026-05-27T10:30:00Z",
  "services": {
    "database": "unhealthy",
    "cache": "healthy",
    "storage": "healthy"
  },
  "version": "1.0.0"
}
```

---

## 4. Common Response Formats

### Success Response

```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
    total?: number;
  };
  timestamp: string; // ISO 8601
}
```

### Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: string; // Error code (e.g., VALIDATION_ERROR, NOT_FOUND)
  message: string; // Human-readable error message
  details?: Record<string, any>; // Additional error details
  requestId: string; // Unique request ID for debugging
  timestamp: string; // ISO 8601
}
```

### Standard Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Authentication required or invalid (Phase 2) |
| FORBIDDEN | 403 | Permission denied (Phase 2) |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict (e.g., duplicate) |
| GONE | 410 | Resource expired (e.g., share link) |
| REQUEST_TIMEOUT | 408 | Request took too long (e.g., image generation) |
| RATE_LIMIT_EXCEEDED | 429 | Rate limit exceeded |
| INTERNAL_SERVER_ERROR | 500 | Unexpected server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |
| BAD_GATEWAY | 502 | External service error |

---

## 5. API Standards

### Naming Conventions

**URL Paths:**
- Use kebab-case for all URL paths
- Use plural nouns for resource names
- Use lowercase letters only
- Example: `/test/start`, `/share/create`

**Query Parameters:**
- Use snake_case for query parameter names
- Example: `?page=1&page_size=10&sort_by=created_at`

**JSON Keys:**
- Use snake_case for JSON property names
- Example: `{"share_token": "...", "primary_personality_id": "..."}`

**HTTP Methods:**
- Use appropriate HTTP methods for operations:
  - GET: Retrieve resources
  - POST: Create resources or trigger actions
  - PUT: Update resources (full update)
  - PATCH: Update resources (partial update)
  - DELETE: Delete resources

### Pagination Format

**Query Parameters:**
```
?page=1&page_size=10
```

**Response Format:**
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "timestamp": "2026-05-27T10:30:00Z"
}
```

**Pagination Rules:**
- Default page size: 20
- Maximum page size: 100
- Page numbering starts at 1
- Include total count in response

### Filtering and Sorting

**Filtering:**
```
?field=value&another_field=value
```

**Sorting:**
```
?sort_by=field&sort_order=asc
```

**Multiple Sort Fields:**
```
?sort_by=field1,field2&sort_order=asc,desc
```

### Rate Limiting Headers

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1716800000
X-RateLimit-Reset-After: 300
X-Request-Id: req_1234567890
```

**Rate Limit Exceeded Response:**
```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Please try again later.",
  "details": {
    "limit": 100,
    "remaining": 0,
    "reset_at": "2026-05-27T10:35:00Z"
  },
  "requestId": "req_1234567890",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

### CORS Configuration

**Phase 1 (Current):**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: false
```

**Phase 2 (Future):**
```
Access-Control-Allow-Origin: https://chickpersonality.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true
```

### Security Headers

**Response Headers:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
X-API-Version: 1.0
```

---

## 6. OpenAPI/Swagger Specification

### OpenAPI 3.0 Specification

```yaml
openapi: 3.0.3
info:
  title: ChickPersonality API
  description: API for the ChickPersonality personality test application
  version: 1.0.0
  contact:
    name: ChickPersonality Team
    email: api@chickpersonality.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.chickpersonality.com/v1
    description: Production server
  - url: https://staging-api.chickpersonality.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: Test
    description: Test session management
  - name: Results
    description: Test result retrieval
  - name: Share
    description: Share link management
  - name: Configuration
    description: Application configuration
  - name: Image
    description: Image generation
  - name: Health
    description: Health check endpoints

paths:
  /questions:
    get:
      tags:
        - Test
      summary: Get active questions
      description: Retrieve all active questions with their answer options ordered by question number
      operationId: getQuestions
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/QuestionsResponse'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /test/start:
    post:
      tags:
        - Test
      summary: Start test session
      description: Initialize a new test session and return session ID
      operationId: startTest
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StartTestRequest'
      responses:
        '201':
          description: Test session created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StartTestResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /test/answer:
    post:
      tags:
        - Test
      summary: Submit answer
      description: Submit an answer for a specific question during the test session
      operationId: submitAnswer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitAnswerRequest'
      responses:
        '200':
          description: Answer submitted successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SubmitAnswerResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /test/finish:
    post:
      tags:
        - Test
      summary: Finish test
      description: Complete the test, calculate personality scores, and generate results
      operationId: finishTest
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FinishTestRequest'
      responses:
        '200':
          description: Test completed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FinishTestResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /results/{shareToken}:
    get:
      tags:
        - Results
      summary: Get result by share token
      description: Retrieve a test result by its share token
      operationId: getResultByShareToken
      parameters:
        - name: shareToken
          in: path
          required: true
          schema:
            type: string
            pattern: '^[a-zA-Z0-9]{32}$'
      responses:
        '200':
          description: Result retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetResultResponse'
        '404':
          description: Result not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '410':
          description: Result expired
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /share/create:
    post:
      tags:
        - Share
      summary: Create share link
      description: Create a shareable link for a test result
      operationId: createShareLink
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateShareLinkRequest'
      responses:
        '200':
          description: Share link created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateShareLinkResponse'
        '404':
          description: Result not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /config/public:
    get:
      tags:
        - Configuration
      summary: Get public configuration
      description: Retrieve public configuration values for the frontend
      operationId: getPublicConfiguration
      responses:
        '200':
          description: Configuration retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPublicConfigResponse'

  /image/generate:
    post:
      tags:
        - Image
      summary: Generate shareable image
      description: Generate a shareable image card for a test result
      operationId: generateImage
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateImageRequest'
      responses:
        '200':
          description: Image generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateImageResponse'
        '404':
          description: Result not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '408':
          description: Image generation timeout
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /health:
    get:
      tags:
        - Health
      summary: Health check
      description: Health check endpoint for monitoring
      operationId: healthCheck
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthCheckResponse'
        '503':
          description: Service is unhealthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthCheckResponse'

components:
  schemas:
    QuestionsResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: array
          items:
            $ref: '#/components/schemas/QuestionWithOptions'
        meta:
          $ref: '#/components/schemas/Meta'
        timestamp:
          type: string
          format: date-time

    QuestionWithOptions:
      type: object
      properties:
        id:
          type: string
          format: uuid
        question_text:
          type: string
        question_number:
          type: integer
        category:
          type: string
          nullable: true
        answer_options:
          type: array
          items:
            $ref: '#/components/schemas/AnswerOption'

    AnswerOption:
      type: object
      properties:
        id:
          type: string
          format: uuid
        option_text:
          type: string
        option_order:
          type: integer

    StartTestRequest:
      type: object
      required:
        - device_type
      properties:
        device_type:
          type: string
          enum: [mobile, tablet, desktop]
        user_agent:
          type: string

    StartTestResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/TestSession'
        timestamp:
          type: string
          format: date-time

    TestSession:
      type: object
      properties:
        session_id:
          type: string
          format: uuid
        started_at:
          type: string
          format: date-time
        question_count:
          type: integer

    SubmitAnswerRequest:
      type: object
      required:
        - session_id
        - question_id
        - answer_option_id
      properties:
        session_id:
          type: string
          format: uuid
        question_id:
          type: string
          format: uuid
        answer_option_id:
          type: string
          format: uuid

    SubmitAnswerResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/AnswerSubmission'
        timestamp:
          type: string
          format: date-time

    AnswerSubmission:
      type: object
      properties:
        session_id:
          type: string
          format: uuid
        question_number:
          type: integer
        answered_at:
          type: string
          format: date-time
        next_question_number:
          type: integer

    FinishTestRequest:
      type: object
      required:
        - session_id
        - answers
        - total_time_seconds
      properties:
        session_id:
          type: string
          format: uuid
        answers:
          type: array
          items:
            $ref: '#/components/schemas/TestAnswer'
        total_time_seconds:
          type: integer

    TestAnswer:
      type: object
      required:
        - question_id
        - answer_option_id
      properties:
        question_id:
          type: string
          format: uuid
        answer_option_id:
          type: string
          format: uuid

    FinishTestResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/TestResult'
        timestamp:
          type: string
          format: date-time

    TestResult:
      type: object
      properties:
        id:
          type: string
          format: uuid
        share_token:
          type: string
          pattern: '^[a-zA-Z0-9]{32}$'
        primary_personality:
          $ref: '#/components/schemas/PersonalityType'
        secondary_personalities:
          type: array
          items:
            $ref: '#/components/schemas/PersonalityType'
        score_breakdown:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ScoreBreakdown'
        total_time_seconds:
          type: integer
        device_type:
          type: string
          enum: [mobile, tablet, desktop]
        completed_at:
          type: string
          format: date-time

    PersonalityType:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        slug:
          type: string
        theme:
          type: string
        color_palette:
          $ref: '#/components/schemas/ColorPalette'
        icon_url:
          type: string
          nullable: true
        traits:
          type: array
          items:
            type: string
        description:
          type: string
        strengths:
          type: array
          items:
            type: string
        weaknesses:
          type: array
          items:
            type: string
        compatibility_matrix:
          type: object
          additionalProperties:
            type: object

    ColorPalette:
      type: object
      properties:
        primary:
          type: string
        secondary:
          type: string
        accent:
          type: string
        background:
          type: string
        text:
          type: string

    ScoreBreakdown:
      type: object
      properties:
        percentage:
          type: number
          minimum: 0
          maximum: 100
        raw_score:
          type: number

    GetResultResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/PublicTestResult'
        timestamp:
          type: string
          format: date-time

    PublicTestResult:
      type: object
      properties:
        share_token:
          type: string
          pattern: '^[a-zA-Z0-9]{32}$'
        primary_personality:
          $ref: '#/components/schemas/PersonalityType'
        secondary_personalities:
          type: array
          items:
            $ref: '#/components/schemas/PersonalityType'
        score_breakdown:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ScoreBreakdown'
        completed_at:
          type: string
          format: date-time

    CreateShareLinkRequest:
      type: object
      required:
        - share_token
      properties:
        share_token:
          type: string
          pattern: '^[a-zA-Z0-9]{32}$'

    CreateShareLinkResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/ShareLink'
        timestamp:
          type: string
          format: date-time

    ShareLink:
      type: object
      properties:
        share_url:
          type: string
          format: uri
        share_token:
          type: string
          pattern: '^[a-zA-Z0-9]{32}$'
        expires_at:
          type: string
          format: date-time
        created_at:
          type: string
          format: date-time

    GetPublicConfigResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          additionalProperties:
            type: string
        timestamp:
          type: string
          format: date-time

    GenerateImageRequest:
      type: object
      required:
        - share_token
      properties:
        share_token:
          type: string
          pattern: '^[a-zA-Z0-9]{32}$'

    GenerateImageResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/GeneratedImage'
        timestamp:
          type: string
          format: date-time

    GeneratedImage:
      type: object
      properties:
        image_url:
          type: string
          format: uri
        generated_at:
          type: string
          format: date-time
        expires_at:
          type: string
          format: date-time

    HealthCheckResponse:
      type: object
      properties:
        status:
          type: string
          enum: [healthy, unhealthy]
        timestamp:
          type: string
          format: date-time
        services:
          type: object
          properties:
            database:
              type: string
              enum: [healthy, unhealthy]
            cache:
              type: string
              enum: [healthy, unhealthy]
            storage:
              type: string
              enum: [healthy, unhealthy]
        version:
          type: string

    Meta:
      type: object
      properties:
        total:
          type: integer
        pagination:
          $ref: '#/components/schemas/Pagination'

    Pagination:
      type: object
      properties:
        page:
          type: integer
        pageSize:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer

    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: string
        message:
          type: string
        details:
          type: object
          additionalProperties: true
        requestId:
          type: string
        timestamp:
          type: string
          format: date-time

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT authentication (Phase 2)

security:
  - bearerAuth: []
```

---

## 7. API Versioning and Deprecation

### Versioning Strategy

**URL Versioning:**
- Current version: `/v1/`
- New major versions: `/v2/`, `/v3/`, etc.
- Backward compatibility maintained within major version

**Deprecation Process:**
1. Add deprecation notice to endpoint documentation
2. Add `Deprecation` header to responses
3. Maintain deprecated endpoint for minimum 6 months
4. Remove endpoint after deprecation period

**Deprecation Header:**
```
Deprecation: true
Sunset: 2026-11-27T00:00:00Z
Link: <https://api.chickpersonality.com/v2/test/start>; rel="successor-version"
```

### Backward Compatibility Guidelines

1. **Never remove fields from response** without deprecation
2. **Add new fields to response** without breaking existing clients
3. **Enum values** can be added but not removed
4. **Query parameters** should have sensible defaults
5. **HTTP status codes** should remain consistent

---

## 8. API Testing Strategy

### Unit Tests

**Repository Tests:**
- Mock database connections
- Test CRUD operations
- Test custom query methods
- Test error handling

**Service Tests:**
- Mock repositories and external services
- Test business logic
- Test validation
- Test error handling

### Integration Tests

**API Endpoint Tests:**
- Test all endpoints with valid requests
- Test error responses
- Test rate limiting
- Test authentication (Phase 2)

**Database Integration Tests:**
- Test with real database (test environment)
- Test transactions
- Test constraints
- Test migrations

### E2E Tests

**User Flow Tests:**
- Test complete test-taking flow
- Test result sharing flow
- Test error recovery
- Test cross-browser compatibility

### API Testing Tools

- **Jest**: Unit and integration tests
- **Supertest**: HTTP assertion library
- **Postman**: Manual API testing
- **Newman**: Postman CLI for automated tests
- **Playwright**: E2E API testing

---

## 9. API Documentation

### Documentation Tools

- **Swagger UI**: Interactive API documentation
- **Redoc**: Beautiful API documentation
- **Postman Collections**: API request collections
- **API Blueprint**: API description format

### Documentation Location

- **Swagger UI**: `https://api.chickpersonality.com/v1/docs`
- **Redoc**: `https://api.chickpersonality.com/v1/redoc`
- **Postman**: Public collection available

### Documentation Updates

- Update documentation with every API change
- Include examples for all endpoints
- Document error responses
- Include rate limiting information
- Document deprecation notices

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-27  
**Status**: Draft - Ready for Review  
**Next Step**: Proceed to `/aspec-15-agents-md` - Generate Project AGENTS.md (Step 15)
