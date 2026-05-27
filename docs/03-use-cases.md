# Use Cases

## Document Information
- **Project**: ChickPersonality
- **Based on**: Project Spec Description (Step 1) and User Stories (Step 2)
- **Version**: 1.0
- **Last Updated**: 2026-05-26

---

## Use Case 1: Take Personality Test

**Use Case ID**: UC-001
**Use Case Name**: Take Personality Test
**Actor(s)**: Primary User (Test Taker)
**Description**: A user navigates through the personality test, answering questions one at a time until all questions are completed.

**Preconditions:**
- User has accessed the ChickPersonality application URL
- Landing page is loaded and displayed
- Test questions and answer options are configured in the system

**Postconditions:**
- All user answers are saved in temporary storage
- System has calculated personality scores for all 7 categories
- Primary personality type is determined
- Results page is displayed with personality information

**Main Flow (Happy Path):**
1. User clicks "Start Test" button on landing page
2. System validates that test content is available
3. System displays first question with 4-5 answer options
4. System displays progress indicator (e.g., "Question 1 of 25")
5. User reads the question and answer options
6. User selects an answer option by clicking/tapping it
7. System visually highlights the selected option
8. User clicks "Next" button to proceed
9. System saves the selected answer to local storage
10. System updates progress indicator
11. System applies smooth transition animation (<500ms)
12. System displays next question with answer options
13. User repeats steps 5-12 for all remaining questions
14. On final question, user clicks "Finish" instead of "Next"
15. System validates that all questions have been answered
16. System calculates weighted scores for all 7 personality categories
17. System determines primary personality type (highest score)
18. System applies tie-breaker rules if needed
19. System generates results page with personality information
20. System displays results page with custom visual theme

**Alternative Flows:**
- **Alt Flow 1**: Navigate to previous question
  - At step 8, if user clicks "Previous" button instead of "Next", then system displays the previous question with the user's previously selected answer preserved
  - User can modify the answer and proceed forward again

- **Alt Flow 2**: Resume from saved progress
  - At step 1, if user has partially completed test in local storage, then system displays confirmation dialog to resume or start fresh
  - If user chooses to resume, then system loads the last unanswered question

- **Alt Flow 3**: Skip question (not allowed)
  - At step 8, if user attempts to proceed without selecting an answer, then system displays error message prompting user to select an answer before proceeding

**Exception Flows:**
- **Exception 1**: Network error during navigation
  - At any step, if network connection fails, then system displays friendly error message with "Retry" button
  - User clicks "Retry", then system attempts to reload the current question

- **Exception 2**: Content fails to load
  - At step 3, if question content fails to load, then system displays error message explaining content is temporarily unavailable
  - System provides option to refresh page or retry

- **Exception 3**: Invalid answer selection
  - At step 6, if user attempts to select multiple answers (when single selection is required), then system prevents multiple selection and displays visual feedback

**Business Rules:**
- BR-001: Users must answer all questions before results can be calculated
- BR-002: Each question must have exactly one selected answer
- BR-003: Progress must be saved to local storage after each answer
- BR-004: Question transitions must complete within 500ms
- BR-005: Test completion should take no more than 5 minutes for average user

**Related User Stories**: US-001, US-002, US-003, US-004, US-005, US-006, US-007

---

## Use Case 2: Calculate Personality Scores

**Use Case ID**: UC-002
**Use Case Name**: Calculate Personality Scores
**Actor(s)**: System (Automated)
**Description**: The system calculates weighted scores for all 7 personality categories based on user's answers and determines the primary personality type.

**Preconditions:**
- User has completed all questions in the test
- All answers are saved and validated
- Scoring weights are configured for each answer option

**Postconditions:**
- Each of the 7 personality categories has a calculated score
- Primary personality type is identified
- Secondary personality types are identified (if applicable)
- Scores are normalized to percentages

**Main Flow (Happy Path):**
1. System receives all user answers from the completed test
2. System initializes score counters for all 7 personality categories to zero
3. System retrieves scoring weight configuration for each answer option
4. For each question answered:
   a. System identifies the selected answer option
   b. System retrieves weight values for this answer option across all 7 personality categories
   c. System adds each weight value to the corresponding personality category score
5. System repeats step 4 for all questions
6. System calculates total possible points for each personality category
7. System normalizes scores to percentages (score / total possible points × 100)
8. System identifies the personality category with the highest percentage score
9. System assigns this category as the primary personality type
10. System identifies secondary personality types (categories with scores within 10% of primary)
11. System validates that percentages sum to approximately 100%
12. System stores calculated scores in the result data structure

**Alternative Flows:**
- **Alt Flow 1**: Tie between personality types
  - At step 8, if two or more personality categories have equal highest scores, then system applies tie-breaker rules
  - System checks predefined priority order for personality types
  - System assigns the higher-priority type as primary
  - System marks tied types as secondary

- **Alt Flow 2**: All scores equal (edge case)
  - At step 8, if all 7 personality categories have equal scores, then system defaults to "The Social Butterfly" as primary type
  - System displays message suggesting user retake test for more accurate results

**Exception Flows:**
- **Exception 1**: Missing weight configuration
  - At step 3, if scoring weights are missing for an answer option, then system logs error and uses default weight of 0 for all categories
  - System alerts administrator about missing configuration

- **Exception 2**: Invalid score calculation
  - At step 7, if calculated percentages do not sum to 100% (within 1% tolerance), then system recalculates using normalization formula
  - If recalculation fails, then system logs error and uses raw scores instead

**Business Rules:**
- BR-006: Each answer option must have weight values for all 7 personality categories
- BR-007: Weight values must be non-negative integers
- BR-008: Primary personality type is the category with the highest normalized score
- BR-009: Secondary personality types are those within 10% of the primary score
- BR-010: Tie-breaker priority order: Bold Explorer, Wise Guardian, Creative Spark, Social Butterfly, Quiet Observer, Natural Leader, Gentle Peacemaker

**Related User Stories**: US-008, US-009, US-010, US-011

---

## Use Case 3: Display Personality Results

**Use Case ID**: UC-003
**Use Case Name**: Display Personality Results
**Actor(s)**: Primary User (Test Taker)
**Description**: The system displays the user's personality results with detailed information about their primary personality type, including traits, strengths, weaknesses, and compatibility.

**Preconditions:**
- User has completed the personality test
- Personality scores have been calculated
- Primary personality type has been determined
- Personality type descriptions are configured in the system

**Postconditions:**
- Results page is displayed with personality information
- User can view all details of their personality type
- User can access sharing options
- User can choose to retake the test

**Main Flow (Happy Path):**
1. System receives calculated personality scores and primary type
2. System retrieves personality type configuration for the primary type
3. System applies the personality type's color theme and visual elements to the results page
4. System displays the primary personality type name prominently at the top
5. System displays an icon or illustration representing the personality type
6. System displays a detailed description of the personality type including:
   - Theme and core characteristics
   - Key traits and behaviors
   - Typical patterns in work and relationships
7. System displays a strengths section with 3-5 key strengths and brief descriptions
8. System displays a weaknesses section with 3-5 key weaknesses and brief descriptions
9. System displays a compatibility section showing:
   - Most compatible personality types with explanations
   - Personality types that may present challenges (constructively presented)
10. System displays a percentage breakdown chart showing all 7 personality types
11. System ensures percentages sum to 100%
12. System displays sharing buttons (Twitter, Facebook, LinkedIn)
13. System displays "Copy Link" and "Copy Text" buttons
14. System displays "Retake Test" button
15. System displays "Generate Image" button for shareable card
16. User can scroll through all sections of the results page
17. User can interact with the percentage breakdown chart to see type descriptions on hover/tap

**Alternative Flows:**
- **Alt Flow 1**: View secondary personality types
  - At step 10, if user has secondary personality types identified, then system displays them with brief descriptions below the primary type
  - User can click on secondary types to view full descriptions

- **Alt Flow 2**: Generate shareable image
  - At step 15, if user clicks "Generate Image" button, then system creates an image card with personality type, name, key traits, and app branding
  - System displays the generated image with download and share options

**Exception Flows:**
- **Exception 1**: Personality type description missing
  - At step 2, if personality type description is missing from configuration, then system displays generic placeholder text
  - System logs error for administrator to fix

- **Exception 2**: Image generation failure
  - At Alt Flow 2, if image generation fails, then system displays error message with option to retry
  - System provides alternative sharing methods (link, text)

**Business Rules:**
- BR-011: Results page must use the personality type's designated color theme
- BR-012: All personality types must have complete descriptions (theme, traits, strengths, weaknesses)
- BR-013: Percentage breakdown must show all 7 personality types
- BR-014: Compatibility information must be constructive and not judgmental
- BR-015: Image generation must complete within 3 seconds

**Related User Stories**: US-012, US-013, US-014, US-015, US-016, US-017, US-018

---

## Use Case 4: Share Results on Social Media

**Use Case ID**: UC-004
**Use Case Name**: Share Results on Social Media
**Actor(s)**: Primary User (Test Taker)
**Description**: A user shares their personality test results on social media platforms (Twitter, Facebook, LinkedIn) using platform-specific sharing dialogs.

**Preconditions:**
- User has completed the personality test
- Results page is displayed
- User is logged into the desired social media platform (in browser or app)

**Postconditions:**
- Social media share dialog is opened with pre-filled content
- User can complete the share on the platform
- Share event is tracked in analytics (anonymized)

**Main Flow (Happy Path):**
1. User views the results page
2. User clicks on a social media share button (Twitter, Facebook, or LinkedIn)
3. System generates shareable content including:
   - Personality type name
   - Brief description or tagline
   - Call-to-action to take the test
   - Link to the ChickPersonality app
4. For Facebook/LinkedIn: System includes the generated image card
5. System opens the platform's share dialog in a new window or popup
6. Platform displays the pre-filled content to the user
7. User can edit the content if desired
8. User confirms the share on the platform
9. Platform publishes the post to the user's feed
10. System detects successful share (via callback or user returning to app)
11. System logs an anonymized share event with:
   - Platform (Twitter/Facebook/LinkedIn)
   - Timestamp
   - Personality type shared
12. System displays confirmation message to user

**Alternative Flows:**
- **Alt Flow 1**: Cancel share
  - At step 8, if user cancels the share on the platform, then platform closes the dialog without publishing
  - System does not log a share event

- **Alt Flow 2**: Share via copy link
  - At step 2, if user clicks "Copy Link" button instead of social media button, then system generates a unique URL for the user's results
  - System copies the URL to clipboard
  - System displays "Link copied!" confirmation message
  - User can paste the link anywhere

- **Alt Flow 3**: Share via copy text
  - At step 2, if user clicks "Copy Text" button, then system generates formatted text with personality type, description, and link
  - System copies the text to clipboard
  - System displays "Text copied!" confirmation message

**Exception Flows:**
- **Exception 1**: Social media platform unavailable
  - At step 5, if the social media platform's share API is unavailable or blocked, then system displays error message
  - System suggests alternative sharing methods (copy link, copy text)

- **Exception 2**: Popup blocked
  - At step 5, if the browser blocks the popup dialog, then system displays message asking user to allow popups
  - System provides alternative: open share in same tab with back button

- **Exception 3**: Share tracking failure
  - At step 11, if share event logging fails, then system does not prevent the share from completing
  - System logs error for administrator investigation

**Business Rules:**
- BR-016: Share content must include personality type name and app link
- BR-017: Share content must be platform-appropriate (professional for LinkedIn, casual for Twitter)
- BR-018: Share events must be logged anonymously (no PII)
- BR-019: Image card must be included for Facebook and LinkedIn shares
- BR-020: Unique result URLs must be generated for each test completion

**Related User Stories**: US-019, US-020, US-021, US-022, US-023, US-024

---

## Use Case 5: Retake Personality Test

**Use Case ID**: UC-005
**Use Case Name**: Retake Personality Test
**Actor(s)**: Primary User (Test Taker)
**Description**: A user chooses to retake the personality test to explore different aspects of their personality or share the experience with others.

**Preconditions:**
- User has previously completed the personality test
- Results page is currently displayed
- Previous answers are stored in local storage

**Postconditions:**
- All previous answers are cleared
- Test is reset to the first question
- User can begin answering questions again
- New results will be calculated independently

**Main Flow (Happy Path):**
1. User views the results page
2. User clicks "Retake Test" button
3. System displays confirmation dialog: "Are you sure you want to retake the test? Your previous results will be replaced."
4. User confirms by clicking "Yes, Retake"
5. System clears all previous answers from local storage
6. System clears any saved progress data
7. System resets progress counter to question 1
8. System redirects to the first question page
9. System displays first question with answer options
10. System displays progress indicator (Question 1 of 25)
11. User proceeds through the test as in Use Case 1
12. System calculates new results based on new answers
13. System displays new results page

**Alternative Flows:**
- **Alt Flow 1**: Cancel retake
  - At step 4, if user clicks "Cancel" in confirmation dialog, then system closes the dialog
  - User remains on the results page with previous results intact

- **Alt Flow 2**: Questions in different order
  - At step 9, if the system supports question randomization, then questions may be displayed in a different order than the previous attempt
  - This prevents users from memorizing answers

**Exception Flows:**
- **Exception 1**: Local storage clear failure
  - At step 5, if clearing local storage fails, then system displays error message
  - System offers option to proceed anyway (answers will be overwritten as user answers new questions)

- **Exception 2**: Navigation failure
  - At step 8, if redirect to first question fails, then system displays error message
  - System provides "Try Again" button

**Business Rules:**
- BR-021: User must confirm before retaking the test
- BR-022: Previous results must be completely cleared before retake
- BR-023: Each test completion is independent (no comparison with previous results in Phase 1)
- BR-024: Questions may be randomized for retakes to prevent answer memorization

**Related User Stories**: US-018

---

## Use Case 6: View App on Mobile Device

**Use Case ID**: UC-006
**Use Case Name**: View App on Mobile Device
**Actor(s)**: Mobile User
**Description**: A user accesses the ChickPersonality application on a mobile phone, with the interface adapting to the smaller screen size and touch interactions.

**Preconditions:**
- User has a mobile device (phone)
- User has internet connection
- User navigates to the ChickPersonality URL

**Postconditions:**
- App is displayed in mobile-optimized layout
- All interactions work with touch gestures
- Text is readable without zooming
- Touch targets meet minimum size requirements

**Main Flow (Happy Path):**
1. User opens mobile browser and navigates to ChickPersonality URL
2. System detects mobile device based on user agent and screen size
3. System applies mobile-responsive CSS styles
4. System displays landing page with:
   - Single-column layout
   - Larger touch targets (minimum 44x44 pixels)
   - Optimized font sizes (minimum 16px body text)
   - Simplified navigation
5. User taps "Start Test" button
6. System displays first question in mobile layout:
   - Question text at top with sufficient spacing
   - Answer options as large, tappable buttons
   - Progress indicator visible at top
   - "Next" and "Previous" buttons at bottom of screen
7. User taps an answer option
8. System provides visual feedback within 100ms (highlight, ripple effect)
9. User taps "Next" button
10. System applies smooth transition animation
11. System displays next question
12. User completes test with touch interactions throughout
13. System displays results page in mobile layout:
   - Single-column scrollable layout
   - Personality type name prominently displayed
   - Collapsible sections for detailed content (optional for space)
   - Sharing buttons in accessible location
14. User can tap sharing buttons to share on mobile social media apps

**Alternative Flows:**
- **Alt Flow 1**: Device rotation
  - At any step, if user rotates device from portrait to landscape, then system detects orientation change
  - System adjusts layout to optimize for landscape mode
  - System maintains user's current position in the test

- **Alt Flow 2**: Swipe navigation
  - At step 9, if user swipes left instead of tapping "Next", then system advances to next question
  - If user swipes right, then system goes to previous question

**Exception Flows:**
- **Exception 1**: Touch target too small
  - At any step, if user attempts to tap an element smaller than 44x44 pixels, then system may register the tap incorrectly
  - System should ensure all interactive elements meet minimum size requirements

- **Exception 2**: Accidental zoom
  - At any step, if user double-taps and causes accidental zoom, then system should prevent default zoom behavior
  - System maintains viewport at proper scale

**Business Rules:**
- BR-025: All touch targets must be at least 44x44 pixels
- BR-026: Body text must be at least 16px on mobile
- BR-027: Layout must be single-column on mobile screens (<768px width)
- BR-028: Touch feedback must occur within 100ms
- BR-029: No horizontal scrolling should be required on mobile

**Related User Stories**: US-025, US-028

---

## Use Case 7: Navigate App with Keyboard

**Use Case ID**: UC-007
**Use Case Name**: Navigate App with Keyboard
**Actor(s)**: Keyboard User (including users with motor disabilities)
**Description**: A user navigates the entire application using only keyboard input, without requiring a mouse or touch input.

**Preconditions:**
- User has a keyboard connected
- User may have motor disability preventing mouse/touch use
- User has accessed the ChickPersonality application

**Postconditions:**
- User can complete the entire test using only keyboard
- All interactive elements are keyboard-accessible
- Focus indicators are clearly visible
- Keyboard shortcuts work as expected

**Main Flow (Happy Path):**
1. User navigates to ChickPersonality URL
2. System loads landing page
3. User presses Tab key
4. System moves focus to first interactive element ("Start Test" button)
5. System displays visible focus indicator (outline, glow, or similar)
6. User presses Tab again to move to next interactive element
7. System moves focus logically through the page
8. User presses Shift+Tab to move focus backward
9. System moves focus to previous interactive element
10. User navigates to "Start Test" button and presses Enter or Space
11. System activates the button and navigates to first question
12. System displays first question with answer options
13. User presses Tab to move focus through answer options
14. User presses Enter or Space on desired answer option to select it
15. System visually highlights the selected option
16. User presses Tab to move to "Next" button
17. User presses Enter or Space to proceed
18. System advances to next question
19. User repeats keyboard navigation through all questions
20. On final question, user submits answers
21. System displays results page
22. User uses Tab to navigate through results sections
23. User can access sharing buttons via keyboard
24. User presses Enter or Space on sharing button to activate

**Alternative Flows:**
- **Alt Flow 1**: Arrow key navigation
  - At step 13, if user uses arrow keys within answer options, then system moves focus between options
  - System supports both Tab and arrow key navigation for better usability

- **Alt Flow 2**: Escape key
  - At any step, if user presses Escape key, then system may cancel current action or close modal dialogs
  - System provides clear feedback about what was canceled

**Exception Flows:**
- **Exception 1**: Focus trap
  - At any step, if focus becomes trapped in an element (cannot Tab out), then this is a keyboard accessibility bug
  - System should ensure all interactive areas have proper focus management

- **Exception 2**: No visible focus indicator
  - At any step, if focused element has no visible indicator, then user cannot see where they are
  - System must always display clear focus indicators

**Business Rules:**
- BR-030: All interactive elements must be keyboard-accessible
- BR-031: Focus must move logically through the page (top to bottom, left to right)
- BR-032: Visible focus indicator must be displayed on all focused elements
- BR-033: Enter and Space must activate focused buttons and links
- BR-034: No keyboard traps should exist in the application

**Related User Stories**: US-029

---

## Use Case 8: Modify Test Content

**Use Case ID**: UC-008
**Use Case Name**: Modify Test Content
**Actor(s)**: Content Administrator
**Description**: A content administrator modifies questions, answer options, or personality type descriptions through configuration files without requiring code changes.

**Preconditions:**
- Administrator has access to the configuration files (JSON, YAML, or similar)
- Administrator understands the configuration structure
- Application is deployed with configuration-based content loading

**Postconditions:**
- Modified content is reflected in the application after deployment
- No code changes are required
- Scoring weights remain consistent with new content
- Application continues to function correctly

**Main Flow (Happy Path):**
1. Administrator opens the configuration file for questions (e.g., `questions.json`)
2. Administrator locates the question to modify
3. Administrator updates the question text
4. Administrator updates answer options as needed
5. Administrator updates scoring weights for each answer option (if changing options)
6. Administrator saves the configuration file
7. Administrator opens the personality type configuration file (e.g., `personality-types.json`)
8. Administrator modifies personality type descriptions, traits, strengths, or weaknesses
9. Administrator saves the configuration file
10. Administrator deploys the updated configuration files to the application
11. System reloads configuration on next request or after deployment
12. System validates configuration structure
13. System applies new content to the application
14. Users see updated questions and personality descriptions

**Alternative Flows:**
- **Alt Flow 1**: Add new personality type
  - At step 7, if administrator wants to add a new personality type, then they add a new entry to the personality types configuration
  - Administrator defines name, theme, color palette, traits, strengths, weaknesses
  - Administrator updates scoring weights in questions to include the new type
  - System automatically includes new type in scoring calculations

- **Alt Flow 2**: Remove personality type
  - At step 7, if administrator wants to remove a personality type, then they remove the entry from configuration
  - Administrator removes scoring weights for that type from all questions
  - System handles removal gracefully without breaking calculations

**Exception Flows:**
- **Exception 1**: Invalid configuration structure
  - At step 12, if configuration validation fails, then system logs error
  - System continues using previous valid configuration
  - Administrator is notified of validation error

- **Exception 2**: Missing scoring weights
  - At step 5, if scoring weights are missing for an answer option, then system uses default weights (0) for missing categories
  - System logs warning for administrator

**Business Rules:**
- BR-035: All configuration changes must be validated before application
- BR-036: Scoring weights must be defined for all personality types for each answer option
- BR-037: Personality type descriptions must include theme, traits, strengths, and weaknesses
- BR-038: Configuration changes should not require application restart (hot reload preferred)
- BR-039: Configuration files should be version-controlled

**Related User Stories**: US-031, US-032, US-033

---

## Use Case 9: Handle Network Error

**Use Case ID**: UC-009
**Use Case Name**: Handle Network Error
**Actor(s)**: Primary User (Test Taker), System
**Description**: The system gracefully handles network errors during test taking, displaying helpful error messages and providing recovery options.

**Preconditions:**
- User is taking the personality test
- Network connection is available
- User has answered at least one question

**Postconditions:**
- User sees a clear, friendly error message
- User can retry the failed action
- User's progress is preserved if possible
- Application remains stable

**Main Flow (Happy Path):**
1. User is answering questions in the test
2. User selects an answer and clicks "Next"
3. System attempts to save answer and load next question
4. Network connection fails (timeout, server error, or no connectivity)
5. System detects network error
6. System displays friendly error message: "Connection lost. Please check your internet connection and try again."
7. System displays "Retry" button
8. User clicks "Retry"
9. System attempts the failed action again (save answer, load next question)
10. Network connection is restored
11. System successfully saves answer and loads next question
12. User continues with the test

**Alternative Flows:**
- **Alt Flow 1**: Error during image generation
  - If network error occurs during image generation for sharing, then system displays error message
  - System offers alternative sharing methods (copy link, copy text)
  - User can proceed without image generation

- **Alt Flow 2**: Error during results calculation
  - If network error occurs during results calculation (if calculation is server-side), then system attempts client-side calculation as fallback
  - If both fail, then system displays error and offers to retry

**Exception Flows:**
- **Exception 1**: Persistent network failure
  - At step 9, if retry fails multiple times (e.g., 3 attempts), then system displays different message: "Unable to connect. Your progress is saved locally. Please try again later when you have a stable connection."
  - System ensures progress is saved to local storage
  - User can close browser and return later

- **Exception 2**: Local storage unavailable
  - At any step, if local storage is unavailable (private browsing, storage quota exceeded), then system displays message explaining progress cannot be saved
  - System offers option to continue without saving (user may lose progress on refresh)

**Business Rules:**
- BR-040: Error messages must be user-friendly and actionable
- BR-041: Retry functionality must be provided for recoverable errors
- BR-042: Progress should be preserved in local storage when possible
- BR-043: Maximum retry attempts should be limited (e.g., 3) before suggesting user try later
- BR-044: Application must not crash on network errors

**Related User Stories**: US-034

---

## Use Case 10: Track Analytics Events

**Use Case ID**: UC-010
**Use Case Name**: Track Analytics Events
**Actor(s)**: System (Automated)
**Description**: The system tracks anonymized analytics events for test completion, abandonment, sharing, and device usage to measure app performance and user behavior.

**Preconditions:**
- Analytics tracking is configured (e.g., Google Analytics, Plausible, Mixpanel)
- User has not opted out of analytics (if opt-out is available)
- Analytics script is loaded on the page

**Postconditions:**
- Analytics events are logged to the analytics platform
- Data is anonymized (no PII)
- Events can be viewed in analytics dashboard
- Data complies with privacy regulations

**Main Flow (Happy Path):**
1. User navigates to ChickPersonality URL
2. System logs page view event with timestamp and device type
3. User clicks "Start Test" button
4. System logs "test_started" event with timestamp
5. User answers questions throughout the test
6. System logs "question_answered" event for each question with question number
7. User completes all questions and submits
8. System calculates results
9. System logs "test_completed" event with:
   - Timestamp
   - Primary personality type
   - Time taken to complete
   - Device type
10. User views results page
11. User clicks social media share button
12. System logs "share_clicked" event with platform
13. User completes share on platform
14. System logs "share_completed" event with platform and personality type
15. User copies share link
16. System logs "link_copied" event
17. All events are sent to analytics platform
18. Analytics platform processes and stores events
19. Administrator can view analytics dashboard with aggregated data

**Alternative Flows:**
- **Alt Flow 1**: Test abandonment
  - At step 6, if user navigates away before completing test, then system logs "test_abandoned" event with:
    - Last question number reached
    - Time spent
    - Device type
  - This helps identify friction points in the test

- **Alt Flow 2**: Analytics opt-out
  - At step 1, if user has opted out of analytics (if feature exists), then system does not load analytics script
  - No events are logged for this user session

**Exception Flows:**
- **Exception 1**: Analytics platform unavailable
  - At any step, if analytics platform is unreachable, then system continues normal operation
  - Events may be queued locally and sent when connection is restored
  - System logs error for administrator

- **Exception 2**: PII accidentally included
  - At any step, if event data accidentally includes PII, then system should sanitize or hash the data before sending
  - System should not include names, emails, or other identifying information

**Business Rules:**
- BR-045: All analytics events must be anonymized (no PII)
- BR-046: Users must be able to opt out of analytics (if required by regulations)
- BR-047: Analytics data must comply with GDPR, CCPA, and other privacy regulations
- BR-048: Events should include relevant context (device type, personality type) without identifying users
- BR-049: Analytics should not impact application performance

**Related User Stories**: US-024, US-044, US-045, US-046

---

## Use Case 11: Use App with Screen Reader

**Use Case ID**: UC-011
**Use Case Name**: Use App with Screen Reader
**Actor(s)**: Visually Impaired User (Screen Reader User)
**Description**: A visually impaired user uses the application with a screen reader (e.g., NVDA, JAWS, VoiceOver) to complete the personality test and view results.

**Preconditions:**
- User has screen reader software installed and active
- User understands screen reader navigation
- Application is built with proper accessibility attributes

**Postconditions:**
- User can complete the entire test using screen reader
- All content is announced clearly by screen reader
- Interactive elements are properly labeled
- User receives same information as sighted users

**Main Flow (Happy Path):**
1. User opens browser and navigates to ChickPersonality URL
2. Screen reader announces page title and main heading
3. User navigates to "Start Test" button
4. Screen reader announces "Start Test, button"
5. User activates button with screen reader command
6. System displays first question
7. Screen reader announces question text with proper semantic markup
8. Screen reader announces "Question 1 of 25" for progress
9. User navigates to answer options
10. Screen reader announces each option as "radio button" with option text
11. User selects an answer option
12. Screen reader announces selected state
13. User navigates to "Next" button
14. Screen reader announces "Next, button"
15. User activates button
16. System displays next question
17. Screen reader announces new question and updated progress
18. User repeats process through all questions
19. User submits answers
20. System displays results page
21. Screen reader announces primary personality type with heading level
22. User navigates through results sections
23. Screen reader announces headings, descriptions, strengths, weaknesses
24. Screen reader describes percentage breakdown chart (alternative text or data table)
25. User navigates to sharing buttons
26. Screen reader announces each sharing button with platform name
27. User can activate sharing options

**Alternative Flows:**
- **Alt Flow 1**: Navigate by headings
  - At any step, if user uses screen reader heading navigation (H key), then screen reader moves through page headings
  - User can quickly jump between sections

- **Alt Flow 2**: Navigate by landmarks
  - At any step, if user uses landmark navigation, then screen reader announces main, navigation, and other regions
  - User can understand page structure

**Exception Flows:**
- **Exception 1**: Missing alt text
  - At any step, if image has no alt text, then screen reader may announce filename or nothing
  - System must provide descriptive alt text for all images

- **Exception 2**: Improper semantic markup
  - At any step, if content uses div instead of proper semantic elements, then screen reader may not announce correctly
  - System must use proper HTML semantics (headings, buttons, landmarks)

**Business Rules:**
- BR-050: All images must have descriptive alt text
- BR-051: Interactive elements must have accessible labels
- BR-052: Content must use proper semantic HTML (headings, landmarks, lists)
- BR-053: Form controls must have proper labels and associations
- BR-054: State changes must be announced to screen readers (ARIA live regions)

**Related User Stories**: US-040, US-042

---

## Summary Statistics

- **Total Use Cases**: 11
- **Covered Features**: Test Taking, Scoring, Results Display, Social Sharing, Retake Test, Mobile Experience, Keyboard Navigation, Content Management, Error Handling, Analytics, Accessibility
- **Total Business Rules**: 54
- **Average Flows per Use Case**: 3 (Main + Alternatives + Exceptions)

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-26  
**Status**: Draft - Ready for Review
