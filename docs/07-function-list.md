# Function List

## Document Information
- **Project**: ChickPersonality
- **Based on**: Use Cases (Step 3), Data Model (Step 4), Actor List (Step 6)
- **Version**: 1.0
- **Last Updated**: 2026-05-26

---

## 1. Function Catalog

| Function ID | Function Name | Category | Description | Input | Output | Related UC |
|-------------|---------------|----------|-------------|-------|--------|------------|
| F-001 | startTest | Test Management | Initiates a new personality test session | None | TestSession | UC-001 |
| F-002 | loadQuestion | Test Management | Loads a specific question with answer options | questionNumber | QuestionWithOptions | UC-001 |
| F-003 | saveAnswer | Test Management | Saves user's answer to local storage | questionId, answerOptionId | Success/Error | UC-001 |
| F-004 | validateAnswer | Test Management | Validates that an answer is selected before proceeding | questionId, answerOptionId | ValidationResult | UC-001 |
| F-005 | navigateToQuestion | Test Management | Navigates to previous or next question | direction, currentQuestionNumber | QuestionWithOptions | UC-001 |
| F-006 | checkTestProgress | Test Management | Checks for saved progress in local storage | None | ProgressState | UC-001 |
| F-007 | resumeTest | Test Management | Resumes test from saved progress | progressState | QuestionWithOptions | UC-001 |
| F-008 | calculatePersonalityScores | Scoring | Calculates weighted scores for all 7 personality categories | answers[] | ScoreBreakdown | UC-002 |
| F-009 | determinePrimaryPersonality | Scoring | Identifies primary personality type from scores | scoreBreakdown | PersonalityType | UC-002 |
| F-010 | determineSecondaryPersonalities | Scoring | Identifies secondary personality types within 10% of primary | scoreBreakdown, primaryType | PersonalityType[] | UC-002 |
| F-011 | applyTieBreakerRules | Scoring | Applies priority order when scores are tied | tiedTypes[] | PersonalityType | UC-002 |
| F-012 | normalizeScores | Scoring | Normalizes raw scores to percentages | rawScores, totalPossible | PercentageScores | UC-002 |
| F-013 | retrieveScoringWeights | Configuration | Retrieves scoring weights for answer options | answerOptionId | ScoringWeights | UC-002 |
| F-014 | displayResults | Results | Displays personality results page with all details | testResult | ResultsPage | UC-003 |
| F-015 | applyPersonalityTheme | Results | Applies color theme and visual elements for personality type | personalityType | ThemeConfiguration | UC-003 |
| F-016 | retrievePersonalityDescription | Configuration | Retrieves personality type description and details | personalityTypeId | PersonalityType | UC-003 |
| F-017 | generateShareableImage | Results | Generates image card for social sharing | testResult, personalityType | ImageUrl | UC-003, UC-004 |
| F-018 | displayCompatibilityInfo | Results | Displays compatibility information with other types | personalityType | CompatibilityMatrix | UC-003 |
| F-019 | displayScoreBreakdown | Results | Displays percentage breakdown chart of all personality types | scoreBreakdown | ChartData | UC-003 |
| F-020 | openSocialShareDialog | Social Sharing | Opens platform-specific share dialog with pre-filled content | platform, shareContent | ShareDialog | UC-004 |
| F-021 | generateShareContent | Social Sharing | Generates formatted content for social sharing | personalityType, shareUrl | ShareContent | UC-004 |
| F-022 | generateShareLink | Social Sharing | Generates unique shareable URL for results | testResult | ShareUrl | UC-004 |
| F-023 | copyToClipboard | Social Sharing | Copies link or text to clipboard | content | Success/Error | UC-004 |
| F-024 | trackShareEvent | Analytics | Logs share event to analytics | platform, personalityType | Success/Error | UC-004 |
| F-025 | retakeTest | Test Management | Resets test state and starts new test | None | TestSession | UC-005 |
| F-026 | clearLocalStorage | Test Management | Clears saved progress from local storage | None | Success/Error | UC-005 |
| F-027 | detectDeviceType | Responsive Design | Detects user's device type (mobile, tablet, desktop) | userAgent | DeviceType | UC-006 |
| F-028 | applyMobileLayout | Responsive Design | Applies mobile-optimized layout | None | LayoutConfiguration | UC-006 |
| F-029 | applyTabletLayout | Responsive Design | Applies tablet-optimized layout | None | LayoutConfiguration | UC-006 |
| F-030 | applyDesktopLayout | Responsive Design | Applies desktop-optimized layout | None | LayoutConfiguration | UC-006 |
| F-031 | handleOrientationChange | Responsive Design | Handles device orientation changes | orientation | LayoutConfiguration | UC-006 |
| F-032 | setKeyboardFocus | Accessibility | Sets focus to interactive element | elementId | Success/Error | UC-007 |
| F-033 | moveFocus | Accessibility | Moves focus to next/previous interactive element | direction | elementId | UC-007 |
| F-034 | displayFocusIndicator | Accessibility | Displays visible focus indicator on focused element | elementId | Success/Error | UC-007 |
| F-035 | handleKeyboardShortcut | Accessibility | Handles keyboard shortcuts (Enter, Space, Escape, Arrow keys) | key, elementId | ActionResult | UC-007 |
| F-036 | validateFocusManagement | Accessibility | Validates no keyboard traps exist | None | ValidationResult | UC-007 |
| F-037 | loadConfigurationFile | Configuration | Loads configuration file (JSON/YAML) | configPath | Configuration | UC-008 |
| F-038 | validateConfiguration | Configuration | Validates configuration structure and constraints | configuration | ValidationResult | UC-008 |
| F-039 | reloadConfiguration | Configuration | Hot-reloads configuration without restart | None | Success/Error | UC-008 |
| F-040 | updateQuestionContent | Configuration | Updates question text and options | questionId, updates | Success/Error | UC-008 |
| F-041 | updateScoringWeights | Configuration | Updates scoring weights for answer options | answerOptionId, weights | Success/Error | UC-008 |
| F-042 | updatePersonalityType | Configuration | Updates personality type description and details | personalityTypeId, updates | Success/Error | UC-008 |
| F-043 | addPersonalityType | Configuration | Adds new personality type to configuration | personalityTypeData | Success/Error | UC-008 |
| F-044 | removePersonalityType | Configuration | Removes personality type from configuration | personalityTypeId | Success/Error | UC-008 |
| F-045 | detectNetworkError | Error Handling | Detects network connection failures | requestAttempt | NetworkStatus | UC-009 |
| F-046 | displayErrorMessage | Error Handling | Displays user-friendly error message | errorType, message | Success/Error | UC-009 |
| F-047 | retryFailedAction | Error Handling | Retries failed action with exponential backoff | action, maxRetries | Success/Error | UC-009 |
| F-048 | preserveProgress | Error Handling | Saves progress to local storage before error | progressState | Success/Error | UC-009 |
| F-049 | checkLocalStorageAvailability | Error Handling | Checks if local storage is available | None | AvailabilityStatus | UC-009 |
| F-050 | logAnalyticsEvent | Analytics | Logs anonymized analytics event | eventType, eventData | Success/Error | UC-010 |
| F-051 | trackPageView | Analytics | Tracks page view event | pageUrl, deviceType | Success/Error | UC-010 |
| F-052 | trackTestStarted | Analytics | Tracks test started event | sessionId | Success/Error | UC-010 |
| F-053 | trackQuestionAnswered | Analytics | Tracks question answered event | questionNumber | Success/Error | UC-010 |
| F-054 | trackTestCompleted | Analytics | Tracks test completed event | personalityType, timeTaken | Success/Error | UC-010 |
| F-055 | trackTestAbandoned | Analytics | Tracks test abandoned event | lastQuestionNumber, timeSpent | Success/Error | UC-010 |
| F-056 | trackShareClicked | Analytics | Tracks share button clicked event | platform | Success/Error | UC-010 |
| F-057 | trackShareCompleted | Analytics | Tracks share completed event | platform, personalityType | Success/Error | UC-010 |
| F-058 | trackLinkCopied | Analytics | Tracks link copied event | None | Success/Error | UC-010 |
| F-059 | sanitizeEventData | Analytics | Sanitizes event data to remove PII | eventData | SanitizedData | UC-010 |
| F-060 | generateSessionId | Analytics | Generates anonymous session ID | None | SessionId | UC-010 |
| F-061 | hashIpAddress | Analytics | Hashes IP address for privacy | ipAddress | HashedIp | UC-010 |
| F-062 | provideAltText | Accessibility | Provides alt text for images | imageId | AltText | UC-011 |
| F-063 | announceToScreenReader | Accessibility | Announces content changes to screen reader | message | Success/Error | UC-011 |
| F-064 | validateSemanticHTML | Accessibility | Validates HTML semantic structure | htmlContent | ValidationResult | UC-011 |
| F-065 | validateAriaLabels | Accessibility | Validates ARIA labels and roles | element | ValidationResult | UC-011 |
| F-066 | validateColorContrast | Accessibility | Validates color contrast ratios (WCAG 2.1 AA) | foregroundColor, backgroundColor | ContrastRatio | UC-011 |
| F-067 | validateTouchTargetSize | Accessibility | Validates touch target size (minimum 44x44px) | element | ValidationResult | UC-011 |
| F-068 | saveTestResult | Persistence | Saves completed test result to database | testResult | TestResultId | UC-002, UC-003 |
| F-069 | saveTestAnswers | Persistence | Saves all test answers to database | testResultId, answers[] | Success/Error | UC-001, UC-002 |
| F-070 | retrieveTestResult | Persistence | Retrieves test result by share token | shareToken | TestResult | UC-003 |
| F-071 | createShareLink | Persistence | Creates share link for test result | testResultId | ShareLink | UC-004 |
| F-072 | incrementShareLinkClicks | Persistence | Increments click count for share link | shareToken | Success/Error | UC-004 |
| F-073 | checkShareLinkExpiry | Persistence | Checks if share link has expired | shareToken | ExpiryStatus | UC-004 |
| F-074 | deleteExpiredShareLinks | Maintenance | Deletes expired share links from database | None | DeletedCount | UC-009 |
| F-075 | archiveOldTestResults | Maintenance | Archives test results older than 90 days | None | ArchivedCount | UC-009 |
| F-076 | aggregateAnalyticsEvents | Maintenance | Aggregates raw analytics events | timeRange | AggregatedData | UC-010 |
| F-077 | deleteOldAnalyticsEvents | Maintenance | Deletes analytics events older than 1 year | None | DeletedCount | UC-010 |
| F-078 | loadPublicConfiguration | Configuration | Loads public configuration for frontend use | None | PublicConfig | UC-001, UC-003 |
| F-079 | validateInput | Validation | Validates user input to prevent errors | input, validationRules | ValidationResult | UC-001, UC-008 |
| F-080 | sanitizeInput | Validation | Sanitizes input to prevent XSS attacks | input | SanitizedInput | UC-001, UC-008 |

---

## 2. Function Categories

### Test Management
Functions related to test session lifecycle, question navigation, and answer management.
- F-001: startTest
- F-002: loadQuestion
- F-003: saveAnswer
- F-004: validateAnswer
- F-005: navigateToQuestion
- F-006: checkTestProgress
- F-007: resumeTest
- F-025: retakeTest
- F-026: clearLocalStorage

### Scoring
Functions for calculating personality scores and determining personality types.
- F-008: calculatePersonalityScores
- F-009: determinePrimaryPersonality
- F-010: determineSecondaryPersonalities
- F-011: applyTieBreakerRules
- F-012: normalizeScores
- F-013: retrieveScoringWeights

### Results
Functions for displaying and formatting personality test results.
- F-014: displayResults
- F-015: applyPersonalityTheme
- F-016: retrievePersonalityDescription
- F-017: generateShareableImage
- F-018: displayCompatibilityInfo
- F-019: displayScoreBreakdown

### Social Sharing
Functions for sharing results on social media platforms.
- F-020: openSocialShareDialog
- F-021: generateShareContent
- F-022: generateShareLink
- F-023: copyToClipboard
- F-024: trackShareEvent

### Responsive Design
Functions for adapting UI to different device types and orientations.
- F-027: detectDeviceType
- F-028: applyMobileLayout
- F-029: applyTabletLayout
- F-030: applyDesktopLayout
- F-031: handleOrientationChange

### Accessibility
Functions for ensuring accessibility compliance and screen reader support.
- F-032: setKeyboardFocus
- F-033: moveFocus
- F-034: displayFocusIndicator
- F-035: handleKeyboardShortcut
- F-036: validateFocusManagement
- F-062: provideAltText
- F-063: announceToScreenReader
- F-064: validateSemanticHTML
- F-065: validateAriaLabels
- F-066: validateColorContrast
- F-067: validateTouchTargetSize

### Configuration
Functions for loading, validating, and managing configuration content.
- F-037: loadConfigurationFile
- F-038: validateConfiguration
- F-039: reloadConfiguration
- F-040: updateQuestionContent
- F-041: updateScoringWeights
- F-042: updatePersonalityType
- F-043: addPersonalityType
- F-044: removePersonalityType
- F-078: loadPublicConfiguration

### Error Handling
Functions for detecting and handling errors gracefully.
- F-045: detectNetworkError
- F-046: displayErrorMessage
- F-047: retryFailedAction
- F-048: preserveProgress
- F-049: checkLocalStorageAvailability

### Analytics
Functions for tracking and managing analytics events.
- F-050: logAnalyticsEvent
- F-051: trackPageView
- F-052: trackTestStarted
- F-053: trackQuestionAnswered
- F-054: trackTestCompleted
- F-055: trackTestAbandoned
- F-056: trackShareClicked
- F-057: trackShareCompleted
- F-058: trackLinkCopied
- F-059: sanitizeEventData
- F-060: generateSessionId
- F-061: hashIpAddress

### Persistence
Functions for saving and retrieving data from the database.
- F-068: saveTestResult
- F-069: saveTestAnswers
- F-070: retrieveTestResult
- F-071: createShareLink
- F-072: incrementShareLinkClicks
- F-073: checkShareLinkExpiry

### Maintenance
Functions for data cleanup and maintenance jobs.
- F-074: deleteExpiredShareLinks
- F-075: archiveOldTestResults
- F-076: aggregateAnalyticsEvents
- F-077: deleteOldAnalyticsEvents

### Validation
Functions for validating and sanitizing user input.
- F-079: validateInput
- F-080: sanitizeInput

---

## 3. Function Details

### F-001: startTest
**Description**: Initiates a new personality test session, initializing test state and loading first question.

**Input Parameters:**
- None

**Output:**
- Success: TestSession object with sessionId, startTime, currentQuestionNumber
- Error: TestUnavailableError | ConfigurationError

**Side Effects:**
- Clears any existing test progress from local storage
- Initializes new test session state
- Logs "test_started" analytics event

**Business Rules:**
- BR-001: Test content must be available before starting
- BR-002: Configuration must be valid before starting

---

### F-008: calculatePersonalityScores
**Description**: Calculates weighted scores for all 7 personality categories based on user's answers.

**Input Parameters:**
- answers: Array of {questionId, answerOptionId} objects

**Output:**
- Success: ScoreBreakdown object with raw scores for each personality category
- Error: MissingWeightError | InvalidAnswerError

**Side Effects:**
- None (pure calculation function)

**Business Rules:**
- BR-006: Each answer option must have weight values for all 7 personality categories
- BR-007: Weight values must be non-negative integers
- BR-008: Primary personality type is the category with the highest normalized score

---

### F-009: determinePrimaryPersonality
**Description**: Identifies the primary personality type from calculated scores.

**Input Parameters:**
- scoreBreakdown: ScoreBreakdown object with normalized percentage scores

**Output:**
- Success: PersonalityType object with highest score
- Error: AllScoresEqualError | InvalidScoreError

**Side Effects:**
- None (pure calculation function)

**Business Rules:**
- BR-008: Primary personality type is the category with the highest normalized score
- BR-010: Tie-breaker priority order: Bold Explorer, Wise Guardian, Creative Spark, Social Butterfly, Quiet Observer, Natural Leader, Gentle Peacemaker

---

### F-011: applyTieBreakerRules
**Description**: Applies priority order when two or more personality types have equal highest scores.

**Input Parameters:**
- tiedTypes: Array of PersonalityType objects with equal scores

**Output:**
- Success: PersonalityType object with highest priority
- Error: InvalidPriorityError

**Side Effects:**
- None (pure calculation function)

**Business Rules:**
- BR-010: Tie-breaker priority order: Bold Explorer, Wise Guardian, Creative Spark, Social Butterfly, Quiet Observer, Natural Leader, Gentle Peacemaker

---

### F-017: generateShareableImage
**Description**: Generates an image card with personality results for social sharing.

**Input Parameters:**
- testResult: TestResult object with personality type and scores
- personalityType: PersonalityType object with theme and color palette

**Output:**
- Success: ImageUrl string pointing to generated image
- Error: ImageGenerationError | TimeoutError

**Side Effects:**
- Stores generated image in CDN
- Logs image generation event to analytics

**Business Rules:**
- BR-015: Image generation must complete within 3 seconds
- BR-011: Results page must use the personality type's designated color theme

---

### F-020: openSocialShareDialog
**Description**: Opens platform-specific share dialog with pre-filled content.

**Input Parameters:**
- platform: "twitter" | "facebook" | "linkedin"
- shareContent: {title, description, url, imageUrl}

**Output:**
- Success: ShareDialog opened (boolean)
- Error: PlatformUnavailableError | PopupBlockedError

**Side Effects:**
- Opens new window or popup with platform share dialog
- Logs "share_clicked" analytics event

**Business Rules:**
- BR-014: Compatibility information must be constructive and not judgmental
- BR-045: All analytics events must be anonymized (no PII)

---

### F-038: validateConfiguration
**Description**: Validates configuration structure and constraints before applying changes.

**Input Parameters:**
- configuration: Configuration object (questions, personality types, scoring weights)

**Output:**
- Success: ValidationResult with isValid=true
- Error: ValidationError with specific error details

**Side Effects:**
- Logs validation errors for administrator
- Prevents invalid configuration from being applied

**Business Rules:**
- BR-035: All configuration changes must be validated before application
- BR-036: Scoring weights must be defined for all personality types for each answer option
- BR-037: Personality type descriptions must include theme, traits, strengths, and weaknesses

---

### F-045: detectNetworkError
**Description**: Detects network connection failures during API calls or resource loading.

**Input Parameters:**
- requestAttempt: Request metadata (url, method, timeout)

**Output:**
- Success: NetworkStatus with isConnected=true
- Error: NetworkError with error details (timeout, serverError, noConnection)

**Side Effects:**
- Triggers error handling flow
- Preserves user progress if possible

**Business Rules:**
- BR-040: Error messages must be user-friendly and actionable
- BR-041: Retry functionality must be provided for recoverable errors
- BR-042: Progress should be preserved in local storage when possible
- BR-043: Maximum retry attempts should be limited (e.g., 3)
- BR-044: Application must not crash on network errors

---

### F-050: logAnalyticsEvent
**Description**: Logs anonymized analytics event to analytics platform.

**Input Parameters:**
- eventType: "page_view" | "test_started" | "question_answered" | "test_completed" | "test_abandoned" | "share_clicked" | "share_completed" | "link_copied"
- eventData: JSON object with event-specific data

**Output:**
- Success: Event logged (boolean)
- Error: AnalyticsUnavailableError | SanitizationError

**Side Effects:**
- Sends event to analytics platform
- Queues events locally if platform unavailable

**Business Rules:**
- BR-045: All analytics events must be anonymized (no PII)
- BR-046: Users must be able to opt out of analytics (if required by regulations)
- BR-047: Analytics data must comply with GDPR, CCPA, and other privacy regulations
- BR-048: Events should include relevant context (device type, personality type) without identifying users
- BR-049: Analytics should not impact application performance

---

### F-066: validateColorContrast
**Description**: Validates color contrast ratios for WCAG 2.1 AA compliance.

**Input Parameters:**
- foregroundColor: Hex color code
- backgroundColor: Hex color code

**Output:**
- Success: ContrastRatio with value and compliance status
- Error: InvalidColorError

**Side Effects:**
- None (pure validation function)

**Business Rules:**
- WCAG 2.1 AA requires minimum 4.5:1 contrast for normal text
- WCAG 2.1 AA requires minimum 3:1 contrast for large text (18pt+)
- WCAG 2.1 AA requires minimum 3:1 contrast for UI components

---

### F-068: saveTestResult
**Description**: Saves completed test result to database with calculated scores and personality type.

**Input Parameters:**
- testResult: TestResult object with scores, personality type, device info

**Output:**
- Success: TestResultId (UUID)
- Error: DatabaseError | ValidationError

**Side Effects:**
- Persists test result to database
- Generates unique share token
- Logs "test_completed" analytics event

**Business Rules:**
- BR-DM-015: Share token must be unique and cryptographically random
- BR-DM-016: Score breakdown must include percentages for all 7 personality types
- BR-DM-017: Percentages in score breakdown must sum to 100% (within 1% tolerance)
- BR-DM-018: IP address must be hashed before storage (SHA-256)

---

### F-074: deleteExpiredShareLinks
**Description**: Deletes expired share links from database (maintenance job).

**Input Parameters:**
- None

**Output:**
- Success: DeletedCount (number of links deleted)
- Error: DatabaseError

**Side Effects:**
- Hard deletes expired share links
- Frees database storage

**Business Rules:**
- BR-DM-023: Share links expire 30 days after creation
- BR-DM-026: Expired links should redirect to landing page with message

---

## 4. Function Dependencies

| Function | Depends On | Called By |
|----------|------------|-----------|
| F-001: startTest | F-078 (loadPublicConfiguration), F-038 (validateConfiguration) | UC-001, User action |
| F-002: loadQuestion | F-078 (loadPublicConfiguration) | F-001, F-005, F-007 |
| F-003: saveAnswer | F-004 (validateAnswer), F-048 (preserveProgress) | UC-001, User action |
| F-004: validateAnswer | F-079 (validateInput) | F-003 |
| F-005: navigateToQuestion | F-002 (loadQuestion) | UC-001, User action |
| F-006: checkTestProgress | None | F-001 |
| F-007: resumeTest | F-006 (checkTestProgress), F-002 (loadQuestion) | UC-001, User action |
| F-008: calculatePersonalityScores | F-013 (retrieveScoringWeights) | UC-002, F-068 |
| F-009: determinePrimaryPersonality | F-008 (calculatePersonalityScores), F-011 (applyTieBreakerRules) | UC-002, F-068 |
| F-010: determineSecondaryPersonalities | F-008 (calculatePersonalityScores) | UC-002, F-068 |
| F-011: applyTieBreakerRules | None | F-009 |
| F-012: normalizeScores | None | F-008 |
| F-013: retrieveScoringWeights | F-037 (loadConfigurationFile) | F-008 |
| F-014: displayResults | F-015 (applyPersonalityTheme), F-016 (retrievePersonalityDescription) | UC-003, F-068 |
| F-015: applyPersonalityTheme | F-016 (retrievePersonalityDescription) | F-014 |
| F-016: retrievePersonalityDescription | F-037 (loadConfigurationFile) | F-014, F-015 |
| F-017: generateShareableImage | F-016 (retrievePersonalityDescription) | UC-003, UC-004, F-021 |
| F-018: displayCompatibilityInfo | F-016 (retrievePersonalityDescription) | F-014 |
| F-019: displayScoreBreakdown | F-008 (calculatePersonalityScores) | F-014 |
| F-020: openSocialShareDialog | F-021 (generateShareContent) | UC-004, User action |
| F-021: generateShareContent | F-016 (retrievePersonalityDescription), F-022 (generateShareLink) | F-020 |
| F-022: generateShareLink | F-071 (createShareLink) | F-021, UC-004 |
| F-023: copyToClipboard | None | UC-004, User action |
| F-024: trackShareEvent | F-050 (logAnalyticsEvent) | F-020 |
| F-025: retakeTest | F-026 (clearLocalStorage), F-001 (startTest) | UC-005, User action |
| F-026: clearLocalStorage | None | F-025 |
| F-027: detectDeviceType | None | F-028, F-029, F-030, F-051 |
| F-028: applyMobileLayout | F-027 (detectDeviceType) | UC-006, F-031 |
| F-029: applyTabletLayout | F-027 (detectDeviceType) | UC-006, F-031 |
| F-030: applyDesktopLayout | F-027 (detectDeviceType) | UC-006, F-031 |
| F-031: handleOrientationChange | F-027 (detectDeviceType) | UC-006, System event |
| F-032: setKeyboardFocus | None | UC-007, F-033 |
| F-033: moveFocus | F-032 (setKeyboardFocus) | UC-007, User action |
| F-034: displayFocusIndicator | F-032 (setKeyboardFocus) | F-033 |
| F-035: handleKeyboardShortcut | F-032 (setKeyboardFocus) | UC-007, User action |
| F-036: validateFocusManagement | None | UC-007, Testing |
| F-037: loadConfigurationFile | None | F-013, F-016, F-038, F-039 |
| F-038: validateConfiguration | F-037 (loadConfigurationFile) | F-039, F-040, F-041, F-042, F-043, F-044 |
| F-039: reloadConfiguration | F-037 (loadConfigurationFile), F-038 (validateConfiguration) | UC-008, System event |
| F-040: updateQuestionContent | F-038 (validateConfiguration) | UC-008, Administrator |
| F-041: updateScoringWeights | F-038 (validateConfiguration) | UC-008, Administrator |
| F-042: updatePersonalityType | F-038 (validateConfiguration) | UC-008, Administrator |
| F-043: addPersonalityType | F-038 (validateConfiguration) | UC-008, Administrator |
| F-044: removePersonalityType | F-038 (validateConfiguration) | UC-008, Administrator |
| F-045: detectNetworkError | None | F-046, F-047 |
| F-046: displayErrorMessage | F-045 (detectNetworkError) | UC-009, F-045 |
| F-047: retryFailedAction | F-045 (detectNetworkError) | UC-009, F-046 |
| F-048: preserveProgress | F-049 (checkLocalStorageAvailability) | F-003, F-045 |
| F-049: checkLocalStorageAvailability | None | F-003, F-048 |
| F-050: logAnalyticsEvent | F-059 (sanitizeEventData), F-060 (generateSessionId), F-061 (hashIpAddress) | F-024, F-051-F-058 |
| F-051: trackPageView | F-050 (logAnalyticsEvent), F-027 (detectDeviceType) | UC-010, Page load |
| F-052: trackTestStarted | F-050 (logAnalyticsEvent), F-060 (generateSessionId) | F-001 |
| F-053: trackQuestionAnswered | F-050 (logAnalyticsEvent) | F-003 |
| F-054: trackTestCompleted | F-050 (logAnalyticsEvent), F-061 (hashIpAddress) | F-068 |
| F-055: trackTestAbandoned | F-050 (logAnalyticsEvent), F-061 (hashIpAddress) | UC-010, Page unload |
| F-056: trackShareClicked | F-050 (logAnalyticsEvent) | F-020 |
| F-057: trackShareCompleted | F-050 (logAnalyticsEvent) | F-020 |
| F-058: trackLinkCopied | F-050 (logAnalyticsEvent) | F-023 |
| F-059: sanitizeEventData | None | F-050 |
| F-060: generateSessionId | None | F-050, F-052 |
| F-061: hashIpAddress | None | F-050, F-054, F-055 |
| F-062: provideAltText | None | UC-011, F-064 |
| F-063: announceToScreenReader | None | UC-011, F-014 |
| F-064: validateSemanticHTML | F-062 (provideAltText) | UC-011, Testing |
| F-065: validateAriaLabels | None | UC-011, Testing |
| F-066: validateColorContrast | None | UC-011, Testing |
| F-067: validateTouchTargetSize | None | UC-011, Testing |
| F-068: saveTestResult | F-008 (calculatePersonalityScores), F-009 (determinePrimaryPersonality), F-010 (determineSecondaryPersonalities), F-061 (hashIpAddress) | F-008, F-009, F-010 |
| F-069: saveTestAnswers | F-079 (validateInput) | F-003, F-068 |
| F-070: retrieveTestResult | F-073 (checkShareLinkExpiry) | UC-003, UC-004 |
| F-071: createShareLink | F-068 (saveTestResult) | F-022 |
| F-072: incrementShareLinkClicks | F-073 (checkShareLinkExpiry) | F-070 |
| F-073: checkShareLinkExpiry | None | F-070, F-072 |
| F-074: deleteExpiredShareLinks | None | Maintenance job |
| F-075: archiveOldTestResults | None | Maintenance job |
| F-076: aggregateAnalyticsEvents | None | Maintenance job |
| F-077: deleteOldAnalyticsEvents | F-076 (aggregateAnalyticsEvents) | Maintenance job |
| F-078: loadPublicConfiguration | F-037 (loadConfigurationFile), F-038 (validateConfiguration) | F-001, F-002, F-014 |
| F-079: validateInput | None | F-004, F-069, F-080 |
| F-080: sanitizeInput | F-079 (validateInput) | F-003, F-040, F-041, F-042 |

---

## 5. Reusable Functions

The following functions are designed to be reusable across multiple use cases and contexts:

### Core Reusable Functions
- **F-050 (logAnalyticsEvent)**: Used by all analytics tracking functions
- **F-038 (validateConfiguration)**: Used by all configuration modification functions
- **F-037 (loadConfigurationFile)**: Used by all functions requiring configuration data
- **F-079 (validateInput)**: Used by all functions accepting user input
- **F-080 (sanitizeInput)**: Used by all functions handling user input for security

### UI Reusable Functions
- **F-027 (detectDeviceType)**: Used by all responsive layout functions
- **F-032 (setKeyboardFocus)**: Used by all keyboard navigation functions
- **F-045 (detectNetworkError)**: Used by all error handling flows
- **F-046 (displayErrorMessage)**: Used by all error scenarios

### Data Reusable Functions
- **F-061 (hashIpAddress)**: Used by all functions requiring IP hashing for privacy
- **F-060 (generateSessionId)**: Used by all functions requiring session tracking
- **F-059 (sanitizeEventData)**: Used by all analytics functions to ensure PII removal

---

## 6. Function Naming Conventions

All functions follow consistent naming conventions:

- **Verb + Noun pattern**: `calculatePersonalityScores`, `loadQuestion`, `saveAnswer`
- **Descriptive and specific**: `determinePrimaryPersonality` (not just `getType`)
- **Consistent terminology**: "Personality" not "Type", "Configuration" not "Config"
- **Action-oriented**: `validateInput`, `sanitizeInput`, `detectNetworkError`
- **Boolean returns for checks**: `checkLocalStorageAvailability`, `checkShareLinkExpiry`

---

## 7. Function Complexity Levels

### Simple Functions (Pure, no side effects)
- F-011: applyTieBreakerRules
- F-012: normalizeScores
- F-027: detectDeviceType
- F-059: sanitizeEventData
- F-060: generateSessionId
- F-061: hashIpAddress
- F-066: validateColorContrast
- F-067: validateTouchTargetSize

### Medium Functions (Some side effects, moderate complexity)
- F-003: saveAnswer
- F-004: validateAnswer
- F-008: calculatePersonalityScores
- F-009: determinePrimaryPersonality
- F-016: retrievePersonalityDescription
- F-023: copyToClipboard
- F-038: validateConfiguration
- F-050: logAnalyticsEvent

### Complex Functions (Multiple side effects, high complexity)
- F-001: startTest
- F-014: displayResults
- F-017: generateShareableImage
- F-020: openSocialShareDialog
- F-039: reloadConfiguration
- F-045: detectNetworkError
- F-068: saveTestResult

---

## 8. Function Performance Requirements

| Function | Max Response Time | SLA |
|----------|-------------------|-----|
| F-001: startTest | 500ms | Critical |
| F-002: loadQuestion | 200ms | Critical |
| F-003: saveAnswer | 100ms | Critical |
| F-008: calculatePersonalityScores | 100ms | Critical |
| F-014: displayResults | 500ms | Critical |
| F-017: generateShareableImage | 3000ms | BR-015 |
| F-020: openSocialShareDialog | 500ms | High |
| F-038: validateConfiguration | 1000ms | Medium |
| F-039: reloadConfiguration | 2000ms | Medium |
| F-050: logAnalyticsEvent | 50ms | Low (non-blocking) |
| F-068: saveTestResult | 500ms | High |
| F-070: retrieveTestResult | 200ms | High |

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-26  
**Status**: Draft - Ready for Review
