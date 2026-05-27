# Action-Function Table

## Document Information
- **Project**: ChickPersonality
- **Based on**: Use Cases (Step 3), Actor List (Step 6), Function List (Step 7)
- **Version**: 1.0
- **Last Updated**: 2026-05-26

---

## 1. Action-Function Matrix

| Action ID | User Action | Actor(s) | Function(s) | Use Case | UI Location |
|-----------|-------------|----------|-------------|----------|-------------|
| ACT-001 | Navigate to app URL | Primary User, Mobile User, Tablet User, Desktop User | F-051: trackPageView, F-027: detectDeviceType | UC-001, UC-006 | Landing page |
| ACT-002 | Click "Start Test" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-001: startTest, F-052: trackTestStarted, F-032: setKeyboardFocus | UC-001, UC-007, UC-011 | Landing page |
| ACT-003 | View first question | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-002: loadQuestion, F-028: applyMobileLayout / F-029: applyTabletLayout / F-030: applyDesktopLayout, F-063: announceToScreenReader | UC-001, UC-006, UC-011 | Question page |
| ACT-004 | Select answer option | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-004: validateAnswer, F-034: displayFocusIndicator, F-063: announceToScreenReader | UC-001, UC-007, UC-011 | Question page |
| ACT-005 | Click "Next" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-003: saveAnswer, F-005: navigateToQuestion, F-053: trackQuestionAnswered, F-048: preserveProgress, F-063: announceToScreenReader | UC-001, UC-007, UC-011 | Question page |
| ACT-006 | Click "Previous" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-005: navigateToQuestion, F-063: announceToScreenReader | UC-001, UC-007, UC-011 | Question page |
| ACT-007 | Attempt to proceed without selecting answer | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-004: validateAnswer, F-046: displayErrorMessage | UC-001 | Question page |
| ACT-008 | Click "Finish" button (final question) | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-003: saveAnswer, F-008: calculatePersonalityScores, F-009: determinePrimaryPersonality, F-010: determineSecondaryPersonalities, F-068: saveTestResult, F-069: saveTestAnswers, F-054: trackTestCompleted | UC-001, UC-002, UC-007, UC-011 | Question page |
| ACT-009 | View results page | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-014: displayResults, F-015: applyPersonalityTheme, F-016: retrievePersonalityDescription, F-018: displayCompatibilityInfo, F-019: displayScoreBreakdown, F-063: announceToScreenReader | UC-003, UC-006, UC-011 | Results page |
| ACT-010 | Click Twitter share button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-020: openSocialShareDialog, F-021: generateShareContent, F-024: trackShareEvent, F-056: trackShareClicked | UC-004, UC-007, UC-011 | Results page |
| ACT-011 | Click Facebook share button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-020: openSocialShareDialog, F-021: generateShareContent, F-017: generateShareableImage, F-024: trackShareEvent, F-056: trackShareClicked | UC-004, UC-007, UC-011 | Results page |
| ACT-012 | Click LinkedIn share button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-020: openSocialShareDialog, F-021: generateShareContent, F-017: generateShareableImage, F-024: trackShareEvent, F-056: trackShareClicked | UC-004, UC-007, UC-011 | Results page |
| ACT-013 | Click "Copy Link" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-022: generateShareLink, F-023: copyToClipboard, F-058: trackLinkCopied | UC-004, UC-007, UC-011 | Results page |
| ACT-014 | Click "Copy Text" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-021: generateShareContent, F-023: copyToClipboard, F-058: trackLinkCopied | UC-004, UC-007, UC-011 | Results page |
| ACT-015 | Click "Generate Image" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-017: generateShareableImage | UC-003, UC-007, UC-011 | Results page |
| ACT-016 | Click "Retake Test" button | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-025: retakeTest, F-026: clearLocalStorage | UC-005, UC-007, UC-011 | Results page |
| ACT-017 | Confirm retake test (click "Yes, Retake") | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-001: startTest, F-052: trackTestStarted | UC-005, UC-007, UC-011 | Confirmation dialog |
| ACT-018 | Cancel retake test (click "Cancel") | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | None (stay on results page) | UC-005, UC-007, UC-011 | Confirmation dialog |
| ACT-019 | Rotate device (portrait to landscape) | Mobile User, Tablet User | F-031: handleOrientationChange, F-027: detectDeviceType | UC-006 | Any page |
| ACT-020 | Swipe left (next question) | Mobile User | F-005: navigateToQuestion, F-003: saveAnswer, F-053: trackQuestionAnswered | UC-006 | Question page |
| ACT-021 | Swipe right (previous question) | Mobile User | F-005: navigateToQuestion | UC-006 | Question page |
| ACT-022 | Tap answer option | Mobile User | F-004: validateAnswer, F-034: displayFocusIndicator | UC-006 | Question page |
| ACT-023 | Press Tab key | Keyboard User | F-033: moveFocus, F-034: displayFocusIndicator | UC-007 | Any page |
| ACT-024 | Press Shift+Tab key | Keyboard User | F-033: moveFocus, F-034: displayFocusIndicator | UC-007 | Any page |
| ACT-025 | Press Enter or Space on focused element | Keyboard User | F-035: handleKeyboardShortcut | UC-007 | Any page |
| ACT-026 | Press Escape key | Keyboard User | F-035: handleKeyboardShortcut | UC-007 | Any page |
| ACT-027 | Press Arrow keys (within answer options) | Keyboard User | F-035: handleKeyboardShortcut, F-033: moveFocus | UC-007 | Question page |
| ACT-028 | Navigate by headings (screen reader H key) | Visually Impaired User | F-064: validateSemanticHTML, F-063: announceToScreenReader | UC-011 | Any page |
| ACT-029 | Navigate by landmarks (screen reader) | Visually Impaired User | F-065: validateAriaLabels, F-063: announceToScreenReader | UC-011 | Any page |
| ACT-030 | Open configuration file | Content Administrator | F-037: loadConfigurationFile | UC-008 | File system / IDE |
| ACT-031 | Modify question text | Content Administrator | F-040: updateQuestionContent, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-032 | Modify answer options | Content Administrator | F-040: updateQuestionContent, F-041: updateScoringWeights, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-033 | Modify scoring weights | Content Administrator | F-041: updateScoringWeights, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-034 | Modify personality type description | Content Administrator | F-042: updatePersonalityType, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-035 | Add new personality type | Content Administrator | F-043: addPersonalityType, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-036 | Remove personality type | Content Administrator | F-044: removePersonalityType, F-038: validateConfiguration | UC-008 | Configuration file |
| ACT-037 | Save configuration file | Content Administrator | F-039: reloadConfiguration, F-038: validateConfiguration | UC-008 | File system / IDE |
| ACT-038 | Deploy configuration to application | Content Administrator | F-039: reloadConfiguration | UC-008 | Deployment system |
| ACT-039 | Click "Retry" button (network error) | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-047: retryFailedAction, F-045: detectNetworkError | UC-009, UC-007, UC-011 | Error dialog |
| ACT-040 | Navigate away from test (abandon) | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-048: preserveProgress, F-055: trackTestAbandoned | UC-009, UC-010 | Any page |
| ACT-041 | Access shared result link | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-070: retrieveTestResult, F-073: checkShareLinkExpiry, F-072: incrementShareLinkClicks, F-051: trackPageView | UC-003, UC-004, UC-007, UC-011 | Shared link URL |
| ACT-042 | View analytics dashboard | Researcher | F-076: aggregateAnalyticsEvents | UC-010 | Analytics dashboard |
| ACT-043 | Resize browser window | Desktop User | F-027: detectDeviceType, F-030: applyDesktopLayout | UC-006 | Any page |
| ACT-044 | Double-tap (accidental zoom) | Mobile User | F-067: validateTouchTargetSize | UC-006 | Any page |
| ACT-045 | Opt out of analytics (if available) | Primary User, Mobile User, Tablet User, Desktop User, Keyboard User, Visually Impaired User | F-050: logAnalyticsEvent (opt-out event) | UC-010 | Settings page |

---

## 2. Action Sequences

### Workflow 1: Complete Personality Test (Happy Path)

```
1. ACT-001: Navigate to app URL
   → F-051: trackPageView
   → F-027: detectDeviceType
   → F-028/F-029/F-030: apply responsive layout

2. ACT-002: Click "Start Test" button
   → F-001: startTest
   → F-052: trackTestStarted
   → F-032: setKeyboardFocus

3. ACT-003: View first question
   → F-002: loadQuestion
   → F-063: announceToScreenReader (if applicable)

4. ACT-004: Select answer option
   → F-004: validateAnswer
   → F-034: displayFocusIndicator
   → F-063: announceToScreenReader (if applicable)

5. ACT-005: Click "Next" button
   → F-003: saveAnswer
   → F-005: navigateToQuestion
   → F-053: trackQuestionAnswered
   → F-048: preserveProgress

6. Repeat steps 3-5 for all questions (25 questions)

7. ACT-008: Click "Finish" button (final question)
   → F-003: saveAnswer
   → F-008: calculatePersonalityScores
   → F-009: determinePrimaryPersonality
   → F-010: determineSecondaryPersonalities
   → F-068: saveTestResult
   → F-069: saveTestAnswers
   → F-054: trackTestCompleted

8. ACT-009: View results page
   → F-014: displayResults
   → F-015: applyPersonalityTheme
   → F-016: retrievePersonalityDescription
   → F-018: displayCompatibilityInfo
   → F-019: displayScoreBreakdown
   → F-063: announceToScreenReader (if applicable)
```

---

### Workflow 2: Share Results on Social Media

```
1. ACT-009: View results page (from Workflow 1)

2. ACT-011: Click Facebook share button
   → F-020: openSocialShareDialog
   → F-021: generateShareContent
   → F-017: generateShareableImage
   → F-024: trackShareEvent
   → F-056: trackShareClicked

3. User completes share on Facebook platform
   → F-057: trackShareCompleted

4. Alternative: ACT-013: Click "Copy Link" button
   → F-022: generateShareLink
   → F-023: copyToClipboard
   → F-058: trackLinkCopied

5. Alternative: ACT-014: Click "Copy Text" button
   → F-021: generateShareContent
   → F-023: copyToClipboard
   → F-058: trackLinkCopied
```

---

### Workflow 3: Retake Personality Test

```
1. ACT-009: View results page (from Workflow 1)

2. ACT-016: Click "Retake Test" button
   → Display confirmation dialog

3. ACT-017: Confirm retake test (click "Yes, Retake")
   → F-025: retakeTest
   → F-026: clearLocalStorage
   → F-001: startTest
   → F-052: trackTestStarted

4. Resume at Workflow 1, step 3

Alternative: ACT-018: Cancel retake test
   → Stay on results page (no function calls)
```

---

### Workflow 4: Resume from Saved Progress

```
1. ACT-001: Navigate to app URL
   → F-051: trackPageView
   → F-027: detectDeviceType

2. F-006: checkTestProgress (automatic on page load)
   → Detects saved progress in local storage

3. Display confirmation dialog: "Resume test or start fresh?"

4. User chooses to resume
   → F-007: resumeTest
   → F-002: loadQuestion (last unanswered question)

5. Resume at Workflow 1, step 4

Alternative: User chooses to start fresh
   → F-026: clearLocalStorage
   → Resume at Workflow 1, step 2
```

---

### Workflow 5: Content Administrator Updates Test Content

```
1. ACT-030: Open configuration file
   → F-037: loadConfigurationFile

2. ACT-031: Modify question text
   → F-040: updateQuestionContent

3. ACT-032: Modify answer options
   → F-040: updateQuestionContent
   → F-041: updateScoringWeights

4. ACT-033: Modify scoring weights
   → F-041: updateScoringWeights

5. ACT-037: Save configuration file
   → F-038: validateConfiguration

6. ACT-038: Deploy configuration to application
   → F-039: reloadConfiguration
   → F-038: validateConfiguration

7. Users see updated content on next page load
```

---

### Workflow 6: Network Error During Test

```
1. User is answering questions (Workflow 1, step 5)

2. F-045: detectNetworkError (automatic on failed request)
   → Network connection fails

3. F-046: displayErrorMessage
   → Show: "Connection lost. Please check your internet connection and try again."

4. ACT-039: Click "Retry" button
   → F-047: retryFailedAction
   → F-045: detectNetworkError

5. If network restored
   → Resume Workflow 1, step 5

6. If retry fails 3 times
   → F-046: displayErrorMessage
   → Show: "Unable to connect. Your progress is saved locally. Please try again later."
   → F-048: preserveProgress
   → User can close browser and return later
```

---

### Workflow 7: Keyboard Navigation Through Test

```
1. ACT-001: Navigate to app URL

2. ACT-023: Press Tab key
   → F-033: moveFocus
   → F-034: displayFocusIndicator
   → Focus moves to "Start Test" button

3. ACT-025: Press Enter or Space
   → F-035: handleKeyboardShortcut
   → F-001: startTest

4. ACT-023: Press Tab key
   → F-033: moveFocus
   → F-034: displayFocusIndicator
   → Focus moves to first answer option

5. ACT-025: Press Enter or Space
   → F-035: handleKeyboardShortcut
   → F-004: validateAnswer
   → Answer selected

6. ACT-023: Press Tab key
   → F-033: moveFocus
   → F-034: displayFocusIndicator
   → Focus moves to "Next" button

7. ACT-025: Press Enter or Space
   → F-035: handleKeyboardShortcut
   → F-003: saveAnswer
   → F-005: navigateToQuestion

8. Repeat steps 4-7 for all questions

9. ACT-024: Press Shift+Tab key
   → F-033: moveFocus (backward)
   → Focus moves to previous element

10. ACT-026: Press Escape key
    → F-035: handleKeyboardShortcut
    → Cancel current action or close modal
```

---

### Workflow 8: Screen Reader Navigation Through Test

```
1. ACT-001: Navigate to app URL

2. Screen reader announces page title and main heading (automatic)
   → F-064: validateSemanticHTML
   → F-063: announceToScreenReader

3. ACT-028: Navigate by headings (screen reader H key)
   → F-064: validateSemanticHTML
   → F-063: announceToScreenReader
   → Jump to "Start Test" heading

4. ACT-002: Click "Start Test" button (screen reader command)
   → F-001: startTest
   → F-052: trackTestStarted

5. Screen reader announces question text (automatic)
   → F-063: announceToScreenReader

6. ACT-029: Navigate by landmarks
   → F-065: validateAriaLabels
   → F-063: announceToScreenReader
   → Understand page structure

7. Navigate to answer options (screen reader)
   → F-063: announceToScreenReader
   → Announces each option as "radio button"

8. Select answer option (screen reader command)
   → F-004: validateAnswer
   → F-063: announceToScreenReader
   → Announces selected state

9. Navigate to "Next" button (screen reader)
   → F-063: announceToScreenReader
   → Announces "Next, button"

10. Activate "Next" button (screen reader command)
    → F-003: saveAnswer
    → F-005: navigateToQuestion
    → F-053: trackQuestionAnswered

11. Repeat steps 5-10 for all questions

12. On results page
    → F-063: announceToScreenReader
    → Announces primary personality type with heading level
    → Announces all sections (description, strengths, weaknesses, compatibility)
    → Describes percentage breakdown chart (alternative text or data table)
```

---

## 3. Action Triggers

| Trigger Type | Action | Function | Condition |
|--------------|--------|----------|-----------|
| User Click | Click "Start Test" button | F-001: startTest | Landing page loaded |
| User Click | Select answer option | F-004: validateAnswer | Question displayed |
| User Click | Click "Next" button | F-003: saveAnswer, F-005: navigateToQuestion | Answer selected |
| User Click | Click "Previous" button | F-005: navigateToQuestion | Question number > 1 |
| User Click | Click "Finish" button | F-008: calculatePersonalityScores, F-068: saveTestResult | Final question answered |
| User Click | Click social share button | F-020: openSocialShareDialog, F-021: generateShareContent | Results page displayed |
| User Click | Click "Copy Link" button | F-022: generateShareLink, F-023: copyToClipboard | Results page displayed |
| User Click | Click "Retake Test" button | F-025: retakeTest | Results page displayed |
| User Click | Click "Retry" button | F-047: retryFailedAction | Network error displayed |
| User Tap | Tap answer option (mobile) | F-004: validateAnswer | Question displayed |
| User Swipe | Swipe left (mobile) | F-005: navigateToQuestion | Question displayed |
| User Swipe | Swipe right (mobile) | F-005: navigateToQuestion | Question number > 1 |
| Keyboard Input | Press Tab key | F-033: moveFocus, F-034: displayFocusIndicator | Any interactive element |
| Keyboard Input | Press Shift+Tab key | F-033: moveFocus, F-034: displayFocusIndicator | Any interactive element |
| Keyboard Input | Press Enter/Space key | F-035: handleKeyboardShortcut | Focused button/link |
| Keyboard Input | Press Escape key | F-035: handleKeyboardShortcut | Modal/dialog open |
| Keyboard Input | Press Arrow keys | F-035: handleKeyboardShortcut, F-033: moveFocus | Within answer options |
| Screen Reader | Navigate by headings | F-064: validateSemanticHTML, F-063: announceToScreenReader | Any page |
| Screen Reader | Navigate by landmarks | F-065: validateAriaLabels, F-063: announceToScreenReader | Any page |
| Screen Reader | Activate element | F-035: handleKeyboardShortcut | Focused element |
| Device Event | Device orientation change | F-031: handleOrientationChange, F-027: detectDeviceType | Mobile/tablet device |
| Device Event | Browser window resize | F-027: detectDeviceType, F-030: applyDesktopLayout | Desktop device |
| Page Load | Navigate to app URL | F-051: trackPageView, F-027: detectDeviceType | Any page load |
| Page Load | Check for saved progress | F-006: checkTestProgress | Landing page load |
| Page Load | Load public configuration | F-078: loadPublicConfiguration | Any page load |
| Timer | Session timeout (future) | F-025: retakeTest | Idle > 30 min (Phase 2) |
| Timer | Configuration reload check | F-039: reloadConfiguration | Every 5 minutes |
| Timer | Data cleanup job | F-074: deleteExpiredShareLinks, F-075: archiveOldTestResults, F-077: deleteOldAnalyticsEvents | Daily at 2:00 AM UTC |
| Timer | Analytics aggregation job | F-076: aggregateAnalyticsEvents | Hourly |
| System Event | Network error detected | F-045: detectNetworkError, F-046: displayErrorMessage | Any API call fails |
| System Event | Local storage unavailable | F-049: checkLocalStorageAvailability, F-046: displayErrorMessage | Storage quota exceeded/private browsing |
| System Event | Configuration validation failed | F-038: validateConfiguration | Configuration file loaded |
| System Event | Test abandonment detected | F-048: preserveProgress, F-055: trackTestAbandoned | User navigates away during test |
| System Event | Share link accessed | F-070: retrieveTestResult, F-073: checkShareLinkExpiry, F-072: incrementShareLinkClicks | Shared link URL opened |
| System Event | Analytics event queued | F-050: logAnalyticsEvent | Any user action |
| Administrator Action | Save configuration file | F-038: validateConfiguration, F-039: reloadConfiguration | Configuration file modified |
| Administrator Action | Deploy configuration | F-039: reloadConfiguration | Deployment triggered |

---

## 4. Error Actions

| Error Condition | User Action | System Response | Function |
|-----------------|-------------|-----------------|----------|
| No answer selected before clicking "Next" | Click "Next" button | Show error: "Please select an answer before proceeding" | F-004: validateAnswer, F-046: displayErrorMessage |
| Network error during question navigation | Click "Next" button | Show error: "Connection lost. Please check your internet connection and try again." with "Retry" button | F-045: detectNetworkError, F-046: displayErrorMessage |
| Network error during image generation | Click "Generate Image" button | Show error: "Unable to generate image. Please try again or use alternative sharing methods." | F-045: detectNetworkError, F-046: displayErrorMessage |
| Network error during results calculation | Click "Finish" button | Attempt client-side calculation, if fails show error: "Unable to calculate results. Please try again." | F-045: detectNetworkError, F-008: calculatePersonalityScores |
| Popup blocked for social share | Click social share button | Show message: "Please allow popups for this site to enable sharing. Alternatively, use copy link." | F-045: detectNetworkError, F-046: displayErrorMessage |
| Social media platform unavailable | Click social share button | Show error: "Sharing service temporarily unavailable. Please try copy link instead." | F-045: detectNetworkError, F-046: displayErrorMessage |
| Local storage unavailable | Any action during test | Show message: "Progress cannot be saved. You may lose progress if you refresh the page." | F-049: checkLocalStorageAvailability, F-046: displayErrorMessage |
| Configuration validation failed | Administrator saves configuration | Show validation errors with specific details, prevent deployment | F-038: validateConfiguration, F-046: displayErrorMessage |
| Missing scoring weight configuration | Calculate scores | Log error, use default weight of 0, alert administrator | F-008: calculatePersonalityScores, F-013: retrieveScoringWeights |
| Invalid score calculation (percentages don't sum to 100%) | Calculate scores | Recalculate using normalization formula, if fails use raw scores, log error | F-008: calculatePersonalityScores, F-012: normalizeScores |
| Personality type description missing | Display results | Show generic placeholder text, log error for administrator | F-016: retrievePersonalityDescription, F-046: displayErrorMessage |
| Share link expired | Access shared link | Redirect to landing page with message: "This shared result has expired. Take the test to get new results." | F-073: checkShareLinkExpiry, F-046: displayErrorMessage |
| Share link not found | Access shared link | Redirect to landing page with message: "Shared result not found. The link may be invalid." | F-070: retrieveTestResult, F-046: displayErrorMessage |
| Touch target too small | Tap element | May register tap incorrectly, ensure all touch targets meet 44x44px minimum | F-067: validateTouchTargetSize |
| Color contrast insufficient | View page | May be difficult for users with color vision deficiency, ensure WCAG 2.1 AA compliance | F-066: validateColorContrast |
| Missing alt text for image | Screen reader navigation | Screen reader may announce filename or nothing, provide descriptive alt text | F-062: provideAltText, F-064: validateSemanticHTML |
| Improper semantic markup | Screen reader navigation | Screen reader may not announce correctly, use proper HTML semantics | F-064: validateSemanticHTML |
| Keyboard trap (cannot Tab out) | Keyboard navigation | User cannot navigate away from element, ensure proper focus management | F-036: validateFocusManagement |
| No visible focus indicator | Keyboard navigation | User cannot see where focus is, always display clear focus indicators | F-034: displayFocusIndicator |
| Analytics platform unavailable | Any action | Continue normal operation, queue events locally, log error for administrator | F-050: logAnalyticsEvent |
| PII accidentally included in analytics | Log analytics event | Sanitize or hash data before sending, do not include names, emails, or identifying information | F-059: sanitizeEventData |
| Multiple answer selection (when single required) | Select answer option | Prevent multiple selection, display visual feedback | F-004: validateAnswer |
| Question content fails to load | Navigate to question | Show error: "Question temporarily unavailable. Please refresh the page." | F-045: detectNetworkError, F-046: displayErrorMessage |
| Retry fails 3 times | Click "Retry" button | Show different message: "Unable to connect. Your progress is saved locally. Please try again later." | F-047: retryFailedAction, F-046: displayErrorMessage |
| Database error saving test result | Click "Finish" button | Show error: "Unable to save results. Please try again." | F-068: saveTestResult, F-046: displayErrorMessage |
| Database error retrieving test result | Access shared link | Show error: "Unable to load results. The link may be invalid." | F-070: retrieveTestResult, F-046: displayErrorMessage |
| Image generation timeout | Click "Generate Image" button | Show error: "Image generation took too long. Please try again or use alternative sharing methods." | F-017: generateShareableImage, F-046: displayErrorMessage |
| Invalid answer option ID | Save answer | Show error: "Invalid answer selected. Please try again." | F-004: validateAnswer, F-079: validateInput |
| Invalid question ID | Load question | Show error: "Question not found. Please refresh the page." | F-002: loadQuestion, F-079: validateInput |
| Invalid personality type ID | Display results | Show error: "Personality type not found. Please contact support." | F-016: retrievePersonalityDescription, F-079: validateInput |
| XSS attempt in user input | Any input field | Sanitize input, prevent script execution, log security event | F-080: sanitizeInput, F-079: validateInput |

---

## 5. Action Priority Levels

| Priority | Actions | Rationale |
|----------|---------|-----------|
| **Critical** | ACT-002 (Start Test), ACT-004 (Select Answer), ACT-005 (Next), ACT-008 (Finish) | Core test-taking flow, must work perfectly |
| **High** | ACT-009 (View Results), ACT-010-014 (Social Sharing), ACT-016 (Retake Test) | Primary user value actions |
| **High** | ACT-023-027 (Keyboard Navigation), ACT-028-029 (Screen Reader) | Accessibility compliance (legal requirement) |
| **Medium** | ACT-019-021 (Mobile Gestures), ACT-039 (Retry Network Error) | Mobile experience and error recovery |
| **Medium** | ACT-030-038 (Content Administration) | Administrator workflow, less frequent |
| **Low** | ACT-042 (View Analytics Dashboard), ACT-045 (Opt Out Analytics) | Secondary features, not core flow |
| **Low** | ACT-043 (Resize Window), ACT-044 (Accidental Zoom) | Edge cases, handled by responsive design |

---

## 6. Action Performance Requirements

| Action ID | Action | Max Response Time | SLA Level |
|-----------|--------|-------------------|-----------|
| ACT-002 | Click "Start Test" button | 500ms | Critical |
| ACT-003 | View first question | 200ms | Critical |
| ACT-004 | Select answer option | 100ms | Critical |
| ACT-005 | Click "Next" button | 200ms | Critical |
| ACT-008 | Click "Finish" button | 1000ms | Critical |
| ACT-009 | View results page | 500ms | Critical |
| ACT-015 | Click "Generate Image" button | 3000ms | High (BR-015) |
| ACT-010-014 | Click social share buttons | 500ms | High |
| ACT-013-014 | Copy link/text to clipboard | 100ms | High |
| ACT-016 | Click "Retake Test" button | 500ms | High |
| ACT-039 | Click "Retry" button | 1000ms | Medium |
| ACT-041 | Access shared result link | 500ms | High |
| ACT-038 | Deploy configuration to application | 2000ms | Medium |
| ACT-050 | Log analytics event | 50ms | Low (non-blocking) |

---

## 7. Action Accessibility Requirements

| Action ID | Action | Accessibility Requirement | WCAG Level |
|-----------|--------|---------------------------|------------|
| ACT-002 | Click "Start Test" button | Keyboard accessible, visible focus indicator, screen reader label | 2.1 AA |
| ACT-004 | Select answer option | Keyboard accessible, visible focus indicator, screen reader announces selection | 2.1 AA |
| ACT-005 | Click "Next" button | Keyboard accessible, visible focus indicator, screen reader label | 2.1 AA |
| ACT-010-014 | Click social share buttons | Keyboard accessible, visible focus indicator, screen reader label | 2.1 AA |
| ACT-015 | Click "Generate Image" button | Keyboard accessible, visible focus indicator, screen reader label | 2.1 AA |
| ACT-016 | Click "Retake Test" button | Keyboard accessible, visible focus indicator, screen reader label | 2.1 AA |
| ACT-022-024 | Tap/swipe (mobile) | Touch targets minimum 44x44px, no horizontal scrolling required | 2.1 AA |
| ACT-023-027 | Keyboard navigation | Full keyboard support, logical tab order, no keyboard traps | 2.1 AA |
| ACT-028-029 | Screen reader navigation | Proper semantic HTML, ARIA labels, alt text for images | 2.1 AA |
| ACT-009 | View results page | Color contrast 4.5:1 (normal text), 3:1 (large text), non-color indicators | 2.1 AA |
| All actions | Error messages | Announced to screen readers (ARIA live regions) | 2.1 AA |

---

## 8. Action Security Requirements

| Action ID | Action | Security Requirement | Implementation |
|-----------|--------|---------------------|----------------|
| ACT-003-008 | Test-taking actions | Sanitize all user input | F-080: sanitizeInput |
| ACT-010-014 | Social sharing actions | No PII in share content | F-059: sanitizeEventData |
| ACT-041 | Access shared result link | Hash IP address, no PII in logs | F-061: hashIpAddress |
| ACT-050 | Log analytics events | Anonymize all data, no PII | F-059: sanitizeEventData, F-061: hashIpAddress |
| ACT-030-038 | Content administration | Validate configuration, prevent code injection | F-038: validateConfiguration, F-080: sanitizeInput |
| All actions | Prevent XSS attacks | Sanitize input, validate output | F-080: sanitizeInput, F-079: validateInput |

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-26  
**Status**: Draft - Ready for Review
