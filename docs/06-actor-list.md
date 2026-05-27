# Actor List

## Document Information
- **Project**: ChickPersonality
- **Based on**: Project Spec Description (Step 1), User Stories (Step 2), Use Cases (Step 3)
- **Version**: 1.0
- **Last Updated**: 2026-05-26

---

## 1. Human Actors

| Actor ID | Actor Name | Description | Goals | Characteristics |
|----------|------------|-------------|-------|-----------------|
| A-001 | Primary User (Test Taker) | Individual user aged 16-35 taking the personality test for self-discovery and entertainment | Discover their personality type, share results on social media, have an engaging experience | Tech-proficient, comfortable with web apps and social media, prefers quick engaging experiences (5-10 minutes), mobile-first usage |
| A-002 | Mobile User | User accessing the app on a mobile phone | Take the test anywhere, use touch interactions, see mobile-optimized layout | Uses smartphone, expects touch-friendly interface, needs larger touch targets (44x44px minimum), prefers single-column layout |
| A-003 | Tablet User | User accessing the app on a tablet device | Take the test on a larger mobile device, benefit from larger screen | Uses iPad or similar, expects layout optimization for tablet, may rotate device between orientations |
| A-004 | Desktop User | User accessing the app on a desktop computer | Take the test on a larger screen with mouse/keyboard input | Uses desktop/laptop browser, expects responsive layout, may resize browser window |
| A-005 | Keyboard User | User with motor disability preventing mouse/touch use | Navigate and complete the entire test using only keyboard input | Has keyboard but cannot use mouse/touch, requires full keyboard accessibility, needs visible focus indicators |
| A-006 | Visually Impaired User (Screen Reader User) | User with visual impairment using screen reader software | Complete the test independently using screen reader (NVDA, JAWS, VoiceOver) | Uses screen reader, needs proper semantic HTML, requires alt text for images, needs logical reading order |
| A-007 | User with Color Vision Deficiency | User with color blindness or color vision issues | Use the app without relying on color alone to convey information | Cannot distinguish certain colors, needs color contrast compliance (WCAG 2.1 AA), requires non-color indicators (icons, text, patterns) |
| A-008 | User with Low Vision | User with limited vision requiring larger text | Read content comfortably with adjustable font size and spacing | May use browser zoom, needs minimum 16px body text, requires 1.5x line spacing, layout must work at 200% zoom |
| A-009 | Content Administrator | Administrator managing test content through configuration files | Modify questions, answer options, personality type descriptions, and scoring weights without code changes | Has access to configuration files (JSON/YAML), understands configuration structure, deploys changes to application |
| A-010 | HR Professional | Secondary user using test for team-building activities | Use personality test for team assessments and understanding team dynamics | Uses test in professional context, may need multiple team members to take test, interested in compatibility information |
| A-011 | Educator | Secondary user incorporating test into classroom activities | Use personality test for educational purposes and student self-discovery | Uses test in educational setting, may have students take test, interested in personality type distribution |
| A-012 | Researcher | Secondary user interested in personality data patterns | Access anonymized personality data for research purposes (with proper consent) | Needs aggregated analytics data, requires data privacy compliance, interested in personality type statistics |
| A-013 | Content Creator | Secondary user looking for engaging content for audiences | Use personality test as content for their audience (videos, blogs, social media) | Creates content around personality tests, may share results publicly, interested in viral potential |

---

## 2. System Actors

| Actor ID | System Name | Type | Integration | Purpose |
|----------|-------------|------|-------------|---------|
| S-001 | Scoring System | Internal | API/Event | Calculates weighted scores for personality types based on user answers, determines primary and secondary personality types, applies tie-breaker rules |
| S-002 | Analytics System | Internal | API/Event | Tracks anonymized analytics events (test completion, abandonment, sharing, device usage), aggregates data for dashboards, complies with privacy regulations |
| S-003 | Twitter/X Platform | External | API | Provides social sharing functionality for Twitter, opens share intents with pre-filled content, tracks share completion via callbacks |
| S-004 | Facebook Platform | External | API | Provides social sharing functionality for Facebook, opens share dialog with image card, tracks share completion via callbacks |
| S-005 | LinkedIn Platform | External | API | Provides social sharing functionality for LinkedIn, opens share dialog with professional content, tracks share completion via callbacks |
| S-006 | Image Generation Service | Internal | API | Generates shareable image cards with personality results, applies personality type color themes, includes app branding |
| S-007 | Analytics Platform | External | API/SDK | External analytics service (Google Analytics, Plausible, Mixpanel) for tracking user behavior and app performance |
| S-008 | Database System | Internal | API/Connection | Stores test results, answers, personality types, questions, configuration, analytics events, provides data persistence |
| S-009 | CDN (Content Delivery Network) | External | API/Connection | Delivers static assets (images, CSS, JS) with low latency, caches frequently accessed content, improves page load performance |
| S-010 | Configuration System | Internal | File/Environment | Loads and validates configuration files (questions, personality types, scoring weights), provides hot-reload capability, separates public/private configs |
| S-011 | Local Storage System | Internal | Browser API | Stores user progress during test session, saves answers temporarily, enables resume functionality, cleared after test completion |
| S-012 | Data Cleanup Scheduler | Internal | Cron/Scheduled Job | Automatically deletes expired share links (after 30 days), archives old test results (after 90 days), aggregates and deletes old analytics events (after 1 year) |
| S-013 | Validation System | Internal | API/Event | Validates all user input to prevent errors, sanitizes data to prevent XSS attacks, enforces business rules and constraints |
| S-014 | Error Handling System | Internal | Event | Gracefully handles network errors, displays user-friendly error messages, provides retry functionality, preserves user progress |

---

## 3. Actor Hierarchy

```
Unauthenticated User
├── Primary User (Test Taker) [A-001]
│   ├── Mobile User [A-002]
│   ├── Tablet User [A-003]
│   └── Desktop User [A-004]
├── Accessibility Users
│   ├── Keyboard User [A-005]
│   ├── Visually Impaired User (Screen Reader User) [A-006]
│   ├── User with Color Vision Deficiency [A-007]
│   └── User with Low Vision [A-008]
└── Secondary Users
    ├── HR Professional [A-010]
    ├── Educator [A-011]
    ├── Researcher [A-012]
    └── Content Creator [A-013]

Authenticated User (Future Phase 2)
└── Registered User
    ├── Regular User
    └── Premium User

Administrative User
└── Content Administrator [A-009]
    └── Super Administrator (Future Phase 2)
```

**Hierarchy Notes:**
- Phase 1 does not include user authentication (all users are unauthenticated)
- Mobile, Tablet, and Desktop users are device-specific variants of the Primary User
- Accessibility users may overlap with device-specific users (e.g., a Mobile User who is also a Keyboard User)
- Secondary users have the same capabilities as Primary Users but use the app for different purposes
- Content Administrator has separate access to configuration files and deployment processes

---

## 4. Actor-Use Case Matrix

| Actor | UC-001 | UC-002 | UC-003 | UC-004 | UC-005 | UC-006 | UC-007 | UC-008 | UC-009 | UC-010 | UC-011 |
|-------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| A-001: Primary User | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| A-002: Mobile User | ✓ | - | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | - | - |
| A-003: Tablet User | ✓ | - | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | - | - |
| A-004: Desktop User | ✓ | - | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | - | - |
| A-005: Keyboard User | ✓ | - | ✓ | ✓ | ✓ | - | ✓ | - | ✓ | - | - |
| A-006: Visually Impaired User | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | ✓ |
| A-007: User with Color Vision Deficiency | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| A-008: User with Low Vision | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| A-009: Content Administrator | - | - | - | - | - | - | - | ✓ | - | - | - |
| A-010: HR Professional | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| A-011: Educator | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| A-012: Researcher | - | - | - | - | - | - | - | - | - | ✓ | - |
| A-013: Content Creator | ✓ | - | ✓ | ✓ | ✓ | - | - | - | ✓ | - | - |
| S-001: Scoring System | - | ✓ | - | - | - | - | - | - | - | - | - |
| S-002: Analytics System | - | - | - | - | - | - | - | - | - | ✓ | - |

**Legend:**
- ✓ = Actor participates in this use case
- - = Actor does not participate in this use case
- UC-001: Take Personality Test
- UC-002: Calculate Personality Scores
- UC-003: Display Personality Results
- UC-004: Share Results on Social Media
- UC-005: Retake Personality Test
- UC-006: View App on Mobile Device
- UC-007: Navigate App with Keyboard
- UC-008: Modify Test Content
- UC-009: Handle Network Error
- UC-010: Track Analytics Events
- UC-011: Use App with Screen Reader

---

## 5. Actor Interactions

### Human-to-Human Interactions

**Primary User ↔ Social Media Followers**
- **Interaction**: Primary User shares personality results on social media platforms
- **Information Flow**: Personality type, shareable image card, app link
- **Purpose**: Viral growth, social engagement, driving new users to the app

**Content Administrator ↔ All Users**
- **Interaction**: Content Administrator modifies test content, all users see updated questions and personality descriptions
- **Information Flow**: Configuration changes deployed to application
- **Purpose**: Content improvement, scoring algorithm refinement, bug fixes

**HR Professional ↔ Team Members**
- **Interaction**: HR Professional shares personality test with team, team members take test
- **Information Flow**: Test link, personality results for team building
- **Purpose**: Team assessments, understanding team dynamics, improving collaboration

**Educator ↔ Students**
- **Interaction**: Educator assigns personality test to students, students complete test
- **Information Flow**: Test link, personality results for educational discussion
- **Purpose**: Self-discovery, classroom activities, personality education

**Content Creator ↔ Audience**
- **Interaction**: Content Creator shares personality test results with audience, audience takes test
- **Information Flow**: Personality results, entertaining content, app link
- **Purpose**: Content creation, audience engagement, viral growth

### Human-to-System Interactions

**Primary User ↔ Scoring System**
- **Interaction**: User completes test, system calculates personality scores
- **Information Flow**: User answers → Scoring System → Personality scores and primary type
- **Purpose**: Determine user's personality type based on weighted answers

**Primary User ↔ Analytics System**
- **Interaction**: User interacts with app, system tracks anonymized events
- **Information Flow**: User actions → Analytics System → Aggregated data
- **Purpose**: Measure app performance, user behavior, completion rates

**Primary User ↔ Social Media Platforms**
- **Interaction**: User clicks share button, system opens platform share dialog
- **Information Flow**: Personality type, image card, app link → Social Platform → Published post
- **Purpose**: Enable social sharing, track share events

**Primary User ↔ Image Generation Service**
- **Interaction**: User clicks "Generate Image", system creates shareable card
- **Information Flow**: Personality type, traits → Image Generation Service → Image card
- **Purpose**: Provide visual content for social sharing

**Content Administrator ↔ Configuration System**
- **Interaction**: Administrator modifies configuration files, system loads and validates
- **Information Flow**: Configuration files → Configuration System → Application content
- **Purpose**: Enable content changes without code deployment

**Primary User ↔ Local Storage System**
- **Interaction**: User answers questions, system saves progress locally
- **Information Flow**: User answers → Local Storage → Progress preservation
- **Purpose**: Enable resume functionality, prevent data loss on refresh

### System-to-System Interactions

**Scoring System ↔ Database System**
- **Interaction**: Scoring System retrieves scoring weights, stores calculated results
- **Information Flow**: Scoring weights, user answers, calculated scores
- **Purpose**: Persistent storage of test results, configuration retrieval

**Analytics System ↔ Analytics Platform**
- **Interaction**: Analytics System sends events to external platform
- **Information Flow**: Anonymized event data (page views, test completion, shares)
- **Purpose**: Centralized analytics dashboard, third-party analytics

**Image Generation Service ↔ CDN**
- **Interaction**: Generated images stored and delivered via CDN
- **Information Flow**: Image files, image URLs
- **Purpose**: Fast image delivery, reduced load on generation service

**Configuration System ↔ Database System**
- **Interaction**: Configuration System loads/stores configuration from database
- **Information Flow**: Questions, personality types, scoring weights
- **Purpose**: Centralized configuration management, hot-reload capability

**Data Cleanup Scheduler ↔ Database System**
- **Interaction**: Scheduler queries and deletes expired data
- **Information Flow:**
- Expired share links (older than 30 days)
- Old test results (older than 90 days)
- Old analytics events (older than 1 year)
- **Purpose**: Data retention compliance, storage optimization

**Validation System ↔ Database System**
- **Interaction**: Validation System checks constraints before database operations
- **Information Flow**: Data validation results, constraint checks
- **Purpose**: Data integrity, prevent invalid data storage

**Error Handling System ↔ Analytics System**
- **Interaction**: Error events logged to analytics for monitoring
- **Information Flow**: Error types, error frequencies, user impact
- **Purpose**: Error monitoring, debugging, user experience improvement

### Time-Based Actor Interactions

**Data Cleanup Scheduler (Cron Job)**
- **Schedule**: Daily execution at 2:00 AM UTC
- **Interactions**: Database System (delete expired data)
- **Purpose**: Automated data cleanup, retention policy enforcement

**Analytics Aggregation Job**
- **Schedule**: Hourly execution
- **Interactions**: Analytics System, Database System
- **Purpose**: Aggregate raw events into daily/monthly statistics

**Configuration Reload Job**
- **Schedule**: On-demand (triggered by deployment) or every 5 minutes
- **Interactions**: Configuration System, Application
- **Purpose**: Hot-reload configuration changes without application restart

---

## 6. Actor Permissions

### Primary User (A-001) and Variants
- **Read**: Landing page, questions, answer options, results page, public configuration
- **Write**: Local storage (test progress), answers during test session
- **Execute**: Take test, view results, share results, retake test
- **Restrictions**: Cannot modify test content, cannot access other users' results, cannot access analytics dashboard

### Content Administrator (A-009)
- **Read**: All configuration files, test content, personality type definitions
- **Write**: Configuration files (questions, answer options, personality types, scoring weights)
- **Execute**: Deploy configuration changes, validate configuration structure
- **Restrictions**: Cannot access user data (PIII), cannot modify production database directly, must use configuration files

### Secondary Users (A-010, A-011, A-012, A-013)
- **Read**: Same permissions as Primary User
- **Write**: Same permissions as Primary User
- **Execute**: Same permissions as Primary User
- **Additional**: May access aggregated analytics data (Researcher), may use test for professional/educational purposes

### System Actors
- **Scoring System**: Read/write access to test answers and results, read access to configuration
- **Analytics System**: Write access to analytics events, read access to aggregated data
- **Configuration System**: Read/write access to configuration, validation access
- **Data Cleanup Scheduler**: Delete access to expired data based on retention policies

---

## 7. Actor Frequency of Use

| Actor | Frequency | Session Duration | Peak Usage Times |
|-------|-----------|------------------|------------------|
| A-001: Primary User | Once per test completion, may retake 1-2 times | 3-5 minutes | Evenings, weekends |
| A-002: Mobile User | Same as Primary User, higher frequency due to convenience | 3-5 minutes | Throughout day, commuting |
| A-003: Tablet User | Same as Primary User | 3-5 minutes | Evenings, weekends |
| A-004: Desktop User | Same as Primary User | 3-5 minutes | Work hours, evenings |
| A-005: Keyboard User | Same as Primary User | 5-7 minutes (slower navigation) | Any time |
| A-006: Visually Impaired User | Same as Primary User | 7-10 minutes (screen reader navigation) | Any time |
| A-007: User with Color Vision Deficiency | Same as Primary User | 3-5 minutes | Any time |
| A-008: User with Low Vision | Same as Primary User | 5-7 minutes (zooming) | Any time |
| A-009: Content Administrator | As needed for content updates (weekly/monthly) | 15-30 minutes per update | Business hours |
| A-010: HR Professional | Periodic (quarterly/annually for team building) | 3-5 minutes per team member | Business hours |
| A-011: Educator | Periodic (semester-based) | 3-5 minutes per student | Academic year |
| A-012: Researcher | Ongoing (analytics dashboard access) | 10-30 minutes per session | Business hours |
| A-013: Content Creator | Per content piece (weekly/monthly) | 3-5 minutes | Content creation schedule |

---

## 8. Actor Technical Proficiency

| Actor | Technical Proficiency | Required Training | Support Needs |
|-------|---------------------|-------------------|---------------|
| A-001: Primary User | High (comfortable with web apps and social media) | None required | Minimal (intuitive UI) |
| A-002: Mobile User | High (mobile-native) | None required | Minimal (touch-friendly UI) |
| A-003: Tablet User | High (tablet-native) | None required | Minimal (responsive UI) |
| A-004: Desktop User | High (desktop-native) | None required | Minimal (responsive UI) |
| A-005: Keyboard User | High (keyboard power user) | None required | Minimal (full keyboard support) |
| A-006: Visually Impaired User | High (screen reader expert) | Screen reader training | Accessibility features, alt text |
| A-007: User with Color Vision Deficiency | High (web user) | None required | Color contrast, non-color indicators |
| A-008: User with Low Vision | Medium (browser zoom user) | Browser zoom training | Font size, spacing, zoom support |
| A-009: Content Administrator | High (developer/admin) | Configuration structure, deployment process | Documentation, validation tools |
| A-010: HR Professional | Medium (business user) | Test interpretation guide | Compatibility explanations |
| A-011: Educator | Medium (educational user) | Test interpretation guide | Educational context, student guidance |
| A-012: Researcher | High (data analyst) | Analytics dashboard training | Data access, privacy compliance |
| A-013: Content Creator | High (digital content creator) | None required | Viral sharing features, image generation |

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-26  
**Status**: Draft - Ready for Review
