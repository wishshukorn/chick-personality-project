# Access Control Design

## Document Information
- **Project**: ChickPersonality
- **Based on**: Actor List (Step 6), Function List (Step 7), Action-Function Table (Step 8)
- **Version**: 1.0
- **Last Updated**: 2026-05-27

---

## 1. Role Definitions

| Role ID | Role Name | Description | Inherits From | Phase |
|---------|-----------|-------------|---------------|-------|
| R-001 | Unauthenticated User | Any user accessing the app without authentication (Phase 1 default) | - | Phase 1 |
| R-002 | Content Administrator | Administrator managing test content through configuration files | R-001 | Phase 1 |
| R-003 | Registered User | Authenticated user with account (future Phase 2) | R-001 | Phase 2 |
| R-004 | Premium User | Paid user with additional features (future Phase 2) | R-003 | Phase 2 |
| R-005 | Super Administrator | Full system administrator with database access (future Phase 2) | R-002 | Phase 2 |

**Role Notes:**
- Phase 1 operates entirely without user authentication (all users are R-001)
- Content Administrator (R-002) has separate access to configuration files and deployment processes, not through the web application
- Phase 2 will introduce user registration, authentication, and account-based features
- Role inheritance follows least privilege principle: each role only adds permissions beyond its parent

---

## 2. Permission Definitions

| Permission ID | Permission Name | Resource | Action | Description | Category |
|---------------|-----------------|----------|--------|-------------|----------|
| P-001 | test:start | Test | CREATE | Start a new personality test session | Test Management |
| P-002 | test:read | Test | READ | View questions and answer options | Test Management |
| P-003 | test:answer | Test | UPDATE | Submit answers during test session | Test Management |
| P-004 | test:navigate | Test | READ | Navigate between questions | Test Management |
| P-005 | test:resume | Test | READ | Resume test from saved progress | Test Management |
| P-006 | test:retake | Test | CREATE | Start a new test after completion | Test Management |
| P-007 | result:view | Result | READ | View personality test results | Results |
| P-008 | result:share | Result | READ | Generate shareable links and content | Social Sharing |
| P-009 | result:image | Result | READ | Generate shareable image cards | Social Sharing |
| P-010 | config:read | Configuration | READ | Load public configuration (questions, personality types) | Configuration |
| P-011 | config:write | Configuration | WRITE | Modify configuration files (questions, scoring, personality types) | Configuration |
| P-012 | config:deploy | Configuration | EXECUTE | Deploy configuration changes to application | Configuration |
| P-013 | config:validate | Configuration | READ | Validate configuration structure and constraints | Configuration |
| P-014 | analytics:view | Analytics | READ | View aggregated analytics dashboard | Analytics |
| P-015 | analytics:track | Analytics | WRITE | Log anonymized analytics events | Analytics |
| P-016 | storage:read | Storage | READ | Access local storage for progress | Persistence |
| P-017 | storage:write | Storage | WRITE | Save progress to local storage | Persistence |
| P-018 | storage:delete | Storage | DELETE | Clear local storage | Persistence |
| P-019 | share:access | ShareLink | READ | Access shared result links via share token | Social Sharing |
| P-020 | share:create | ShareLink | CREATE | Create shareable link for test result | Social Sharing |
| P-021 | system:maintenance | System | EXECUTE | Execute maintenance jobs (data cleanup, aggregation) | Maintenance |
| P-022 | system:error | System | READ | Detect and handle system errors | Error Handling |
| P-023 | accessibility:keyboard | UI | READ | Use keyboard navigation throughout app | Accessibility |
| P-024 | accessibility:sr | UI | READ | Use screen reader navigation throughout app | Accessibility |
| P-025 | database:read | Database | READ | Read from database (test results, analytics) | Persistence |
| P-026 | database:write | Database | WRITE | Write to database (test results, answers) | Persistence |
| P-027 | database:delete | Database | DELETE | Delete from database (expired data) | Maintenance |

---

## 3. Role-Permission Matrix

| Role | test:start | test:read | test:answer | test:navigate | test:resume | test:retake | result:view | result:share | result:image | config:read | config:write | config:deploy | config:validate | analytics:view | analytics:track | storage:read | storage:write | storage:delete | share:access | share:create | system:maintenance | system:error | accessibility:keyboard | accessibility:sr | database:read | database:write | database:delete |
|------|------------|-----------|-------------|--------------|-------------|-------------|-------------|--------------|--------------|-------------|--------------|---------------|-----------------|----------------|-----------------|--------------|---------------|-----------------|-------------|--------------|--------------------|-------------|----------------------|----------------|----------------|-----------------|-----------------|
| R-001: Unauthenticated User | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | ✓ | ✓ | - | - | - |
| R-002: Content Administrator | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | ✓ | ✓ | ✓ | - | - | - |
| R-003: Registered User | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| R-004: Premium User | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| R-005: Super Administrator | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Legend:**
- ✓ = Permission granted
- - = Permission denied

**Permission Notes:**
- R-001 (Unauthenticated User) has all public-facing permissions for Phase 1
- R-002 (Content Administrator) adds configuration management permissions (config:write, config:deploy, config:validate)
- R-003 (Registered User) adds analytics:view, share:create, and database:read/write for personal data
- R-004 (Premium User) inherits all R-003 permissions (no additional permissions defined in Phase 1)
- R-005 (Super Administrator) has full system access including database:delete and system:maintenance

---

## 4. Resource-Level Access Rules

### Resource: Test Session
```
- Owner (session creator): Full access to own test session
- Other users: No access (sessions are isolated to browser/local storage)
- Content Administrator: Read-only access to configuration, not user sessions
- System: Full access for scoring and persistence
```

### Resource: Test Result
```
- Owner (test taker): Full access to own results via share token
- Other users: Read access via share link (if link is valid and not expired)
- Content Administrator: No access to individual user results (PIII protection)
- Registered User (Phase 2): Full access to own historical results
- Super Administrator (Phase 2): Full access to all results for debugging
```

### Resource: Configuration
```
- Unauthenticated User: Read access to public configuration only
- Content Administrator: Full read/write access to configuration files
- Registered User: Read access to public configuration only
- Super Administrator: Full read/write access to configuration files
```

### Resource: Analytics Data
```
- Unauthenticated User: No access to analytics dashboard
- Content Administrator: No access to analytics dashboard
- Researcher (Phase 2): Read access to aggregated/anonymized analytics only
- Registered User: No access to analytics dashboard
- Super Administrator: Full access to all analytics data
```

### Resource: Share Link
```
- Owner (link creator): Full access to own share links
- Other users: Read access via valid share token
- System: Full access for validation, click tracking, and expiry management
- Expired links: Redirect to landing page with expiry message
```

### Resource: Local Storage
```
- Owner (browser user): Full access to own local storage
- Other users: No access (browser sandbox isolation)
- System: No direct access (client-side only)
```

### Resource: Database
```
- Unauthenticated User: No direct access (via API only)
- Content Administrator: No direct database access (via configuration files only)
- Registered User: Read/write access to own data via API
- Super Administrator: Full database access for maintenance
- System Actors: Full access for internal operations
```

---

## 5. Access Control Implementation

### Authentication Method

**Phase 1 (Current):**
- **No authentication** - All users are unauthenticated
- Access is based on public availability of features
- No user accounts, sessions, or login required
- Identification is via anonymous session IDs only (for analytics)

**Phase 2 (Future):**
- **JWT (JSON Web Tokens)** for stateless authentication
- Token-based authentication with refresh tokens
- Optional OAuth 2.0 integration for social login (Google, Facebook, Twitter)
- Session management with secure cookie storage

### Authorization Strategy

**Phase 1 (Current):**
- **Public Access Control** - All features are publicly available
- Role-based separation is enforced at the infrastructure level:
  - Content Administrator access via file system/deployment (not web app)
  - System actors via internal API authentication (service-to-service)
- No runtime permission checks for end users (all are R-001)

**Phase 2 (Future):**
- **RBAC (Role-Based Access Control)** as primary strategy
- **ABAC (Attribute-Based Access Control)** for resource-level rules:
  - Owner-based access (users can only access their own data)
  - Time-based access (share links expire after 30 days)
- Hybrid approach: RBAC for coarse-grained, ABAC for fine-grained control

### Token Structure (Phase 2)

**JWT Access Token:**
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_uuid",
    "role": "R-003",
    "permissions": ["test:start", "test:read", "result:view", ...],
    "iat": 1234567890,
    "exp": 1234571490,
    "jti": "token_uuid"
  }
}
```

**JWT Refresh Token:**
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_uuid",
    "token_id": "access_token_uuid",
    "iat": 1234567890,
    "exp": 1234654290,
    "jti": "refresh_token_uuid"
  }
}
```

**Token Claims:**
- `sub` (Subject): User UUID
- `role`: Role ID (R-001 through R-005)
- `permissions`: Array of permission IDs granted to user
- `iat` (Issued At): Token issuance timestamp
- `exp` (Expiration): Token expiration timestamp
- `jti` (JWT ID): Unique token identifier for revocation

### Permission Checking Pseudocode

**Phase 1 (Current):**
```python
# No runtime permission checks for end users
# All users have R-001 permissions by default
def check_permission(user, permission_id):
    # Phase 1: All public features are accessible
    return True

# Content Administrator check (infrastructure level, not web app)
def is_content_administrator():
    # Checked at deployment/file system level
    # Not exposed to web application
    return False
```

**Phase 2 (Future):**
```python
def check_permission(user, permission_id, resource=None):
    # Step 1: Check if user is authenticated
    if not user.is_authenticated:
        return permission_id in PUBLIC_PERMISSIONS
    
    # Step 2: Check role-based permissions
    if permission_id not in user.permissions:
        return False
    
    # Step 3: Check resource-level access (ABAC)
    if resource:
        if not check_resource_access(user, resource):
            return False
    
    # Step 4: Permission granted
    return True

def check_resource_access(user, resource):
    # Owner-based access
    if resource.owner_id == user.id:
        return True
    
    # Share link access
    if resource.type == "share_link":
        if not resource.is_expired():
            return True
    
    # Admin access
    if user.role in ["R-004", "R-005"]:
        return True
    
    return False

# Middleware example for API endpoints
def require_permission(permission_id):
    def decorator(handler):
        def wrapper(request):
            user = get_user_from_token(request.headers.get("Authorization"))
            
            if not check_permission(user, permission_id, request.resource):
                return 403, "Forbidden"
            
            return handler(request)
        return wrapper
    return decorator
```

### API Endpoint Protection Mapping

**Phase 1 (Current):**
```
All endpoints are publicly accessible:
- GET /api/questions → Public (P-002: test:read)
- POST /api/test/start → Public (P-001: test:start)
- POST /api/test/answer → Public (P-003: test:answer)
- GET /api/results/:shareToken → Public (P-007: result:view, P-019: share:access)
- POST /api/share/create → Public (P-008: result:share, P-020: share:create)
- GET /api/config/public → Public (P-010: config:read)

Content Administrator endpoints (infrastructure level, not web API):
- Configuration file access → File system (not HTTP)
- Deployment → CI/CD pipeline (not HTTP)
```

**Phase 2 (Future):**
```
Public endpoints (no authentication required):
- GET /api/questions → Public (P-002: test:read)
- GET /api/config/public → Public (P-010: config:read)
- GET /api/results/:shareToken → Public (P-007: result:view, P-019: share:access)

Authenticated endpoints (JWT required):
- POST /api/test/start → Authenticated (P-001: test:start)
- POST /api/test/answer → Authenticated (P-003: test:answer)
- POST /api/share/create → Authenticated (P-008: result:share, P-020: share:create)
- GET /api/user/results → Authenticated (P-007: result:view)
- GET /api/analytics/dashboard → Authenticated + Role R-003/R-004 (P-014: analytics:view)

Administrator endpoints (JWT + Role R-002/R-005 required):
- PUT /api/config/questions → Admin (P-011: config:write)
- POST /api/config/deploy → Admin (P-012: config:deploy)
- POST /api/system/maintenance → Admin (P-021: system:maintenance)
- DELETE /api/database/cleanup → Admin (P-027: database:delete)
```

---

## 6. Security Constraints

### Password Policies (Phase 2)

**Requirements:**
- Minimum length: 12 characters
- Maximum length: 128 characters
- Must include: Uppercase letter, lowercase letter, number, special character
- Cannot contain: Username, email, common passwords (from breached password lists)
- Password hashing: Argon2id with minimum memory cost of 64 MB
- Password history: Cannot reuse last 10 passwords
- Password expiry: No forced expiry (modern security practice)
- Password reset: Time-limited tokens (15 minutes), single-use

**Implementation:**
```python
def validate_password(password, user):
    # Length check
    if len(password) < 12 or len(password) > 128:
        return False
    
    # Complexity check
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'[0-9]', password):
        return False
    if not re.search(r'[^A-Za-z0-9]', password):
        return False
    
    # Username/email check
    if user.username.lower() in password.lower():
        return False
    if user.email.lower() in password.lower():
        return False
    
    # Common password check (against breached password list)
    if is_common_password(password):
        return False
    
    # Password history check
    if is_password_reused(password, user.password_history):
        return False
    
    return True
```

### Session Management Rules

**Phase 1 (Current):**
- No server-side sessions (stateless)
- Session tracking via anonymous session IDs in local storage
- Session ID: UUID v4, stored in browser local storage
- Session duration: Until browser tab closed or local storage cleared
- No session timeout (user can resume test anytime)

**Phase 2 (Future):**
- **Access Token Expiry:** 15 minutes
- **Refresh Token Expiry:** 7 days
- **Refresh Token Rotation:** New refresh token issued on each refresh
- **Session Concurrency:** Maximum 5 active sessions per user
- **Session Invalidation:** On password change, account lock, or logout
- **Secure Cookie Flags:** HttpOnly, Secure, SameSite=Strict
- **Token Storage:** HttpOnly cookie (access token), HttpOnly cookie (refresh token)

### Rate Limiting Rules

**Phase 1 (Current):**
- **Test Start Rate:** 10 requests per minute per IP address
- **Answer Submission Rate:** 60 requests per minute per IP address
- **Share Link Creation Rate:** 10 requests per minute per IP address
- **Image Generation Rate:** 5 requests per minute per IP address
- **API Rate Limit:** 100 requests per minute per IP address (global)

**Phase 2 (Future):**
- **Authenticated Users:** Higher limits based on role
  - R-003 (Registered User): 200 requests per minute
  - R-004 (Premium User): 500 requests per minute
  - R-005 (Super Administrator): No rate limit
- **Unauthenticated Users:** Same as Phase 1 limits
- **Rate Limit Headers:** Include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Rate Limit Algorithm:** Token bucket with sliding window

**Implementation:**
```python
# Rate limit check pseudocode
def check_rate_limit(ip_address, endpoint, user=None):
    # Get rate limit based on user role
    if user and user.role in ["R-004", "R-005"]:
        limit = get_role_rate_limit(user.role, endpoint)
    else:
        limit = get_default_rate_limit(endpoint)
    
    # Check current usage
    current_usage = get_usage(ip_address, endpoint, window=60)
    
    if current_usage >= limit:
        return False, "Rate limit exceeded"
    
    # Increment usage
    increment_usage(ip_address, endpoint)
    return True, None
```

### IP Restrictions

**Phase 1 (Current):**
- No IP-based restrictions (public access)
- IP logging: Hashed IP addresses for analytics only (SHA-256)
- IP-based rate limiting: Applied to prevent abuse

**Phase 2 (Future):**
- **Content Administrator Access:** Whitelist of approved IP addresses
- **Super Administrator Access:** Whitelist of approved IP addresses
- **Geographic Restrictions:** None (global access)
- **VPN/Proxy Detection:** Log but do not block
- **Suspicious IP Handling:** Flag for review, CAPTCHA challenge

### Data Privacy Constraints

**PII (Personally Identifiable Information) Protection:**
- No collection of names, emails, or phone numbers in Phase 1
- IP addresses: Hashed before storage (SHA-256 with salt)
- User agents: Stored for analytics only, anonymized
- Test answers: Stored with test result ID only (no user linkage in Phase 1)
- Share tokens: Cryptographically random (UUID v4), no user information

**Analytics Privacy:**
- All analytics events anonymized (no PII)
- Session IDs: UUID v4, no linkage to identity
- Opt-out mechanism available (Phase 2)
- Compliance: GDPR, CCPA, and other privacy regulations

**Data Retention:**
- Test results: 90 days (then archived)
- Share links: 30 days (then deleted)
- Analytics events: 1 year (then aggregated and deleted)
- Archived data: 1 year (then permanently deleted)

### Input Validation Constraints

**All User Input:**
- Sanitize all input to prevent XSS attacks (F-080: sanitizeInput)
- Validate all input against schema (F-079: validateInput)
- Length limits on all text fields
- Type validation on all numeric fields
- SQL injection prevention via parameterized queries
- CSRF protection on all state-changing operations (Phase 2)

**Configuration Input (Content Administrator):**
- Schema validation before deployment (F-038: validateConfiguration)
- No code execution in configuration files
- Scoring weights: Must be numeric, sum to valid ranges
- Personality types: Must include required fields (theme, traits, strengths, weaknesses)
- Questions: Must have valid answer options with scoring weights

### Security Headers

**HTTP Security Headers (Phase 1):**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Additional Headers (Phase 2):**
```
Cache-Control: no-store, no-cache, must-revalidate, private
Pragma: no-cache
Expires: 0
```

---

## 7. Access Control Audit Logging

**Phase 1 (Current):**
- No user authentication, so no access control audit logs
- Analytics events track usage patterns (anonymized)
- Error events logged for debugging
- Configuration changes logged by deployment system

**Phase 2 (Future):**
- **Authentication Events:** Login, logout, failed login attempts, password changes
- **Authorization Events:** Permission denied, unauthorized access attempts
- **Configuration Changes:** Who changed what, when, and why
- **Data Access:** Who accessed which resources (for sensitive data)
- **Admin Actions:** All actions by R-002 and R-005 roles logged

**Audit Log Format:**
```json
{
  "timestamp": "2026-05-27T10:30:00Z",
  "event_type": "authorization_denied",
  "user_id": "user_uuid",
  "role": "R-003",
  "permission": "config:write",
  "resource": "configuration",
  "ip_address": "hashed_ip",
  "user_agent": "sanitized_user_agent",
  "outcome": "denied"
}
```

---

## 8. Compliance Considerations

### GDPR Compliance (Phase 2)
- **Right to Access:** Users can export their data
- **Right to Deletion:** Users can request account deletion
- **Right to Rectification:** Users can update their data
- **Right to Portability:** Users can export data in machine-readable format
- **Consent Management:** Explicit consent for data processing
- **Data Minimization:** Only collect necessary data
- **Data Protection Impact Assessment (DPIA):** Required for new features

### WCAG 2.1 AA Compliance (Phase 1)
- **Perceivable:** Color contrast 4.5:1 (normal text), 3:1 (large text)
- **Operable:** Full keyboard support, no keyboard traps
- **Understandable:** Clear error messages, consistent navigation
- **Robust:** Compatible with assistive technologies (screen readers)
- **Implementation:** Validated via F-064, F-065, F-066, F-067

### CCPA Compliance (Phase 2)
- **Do Not Sell:** Option to opt out of data selling (not applicable, no data selling)
- **Right to Know:** Users can request data disclosure
- **Right to Delete:** Users can request data deletion
- **Right to Non-Discrimination:** No discrimination for exercising privacy rights

---

## 9. Security Best Practices

### Implementation Guidelines
1. **Principle of Least Privilege:** Users only have permissions necessary for their role
2. **Defense in Depth:** Multiple layers of security (validation, sanitization, authorization)
3. **Fail Securely:** Default to deny access, explicitly grant permissions
4. **Security by Design:** Security considered from the start, not added later
5. **Regular Audits:** Periodic security audits and penetration testing
6. **Dependency Management:** Keep dependencies up to date, scan for vulnerabilities
7. **Secrets Management:** Never hardcode secrets, use environment variables or secret managers
8. **Error Handling:** Do not expose sensitive information in error messages

### Monitoring and Alerting
- **Failed Authentication Attempts:** Alert on > 10 failed attempts per IP per hour
- **Unauthorized Access Attempts:** Alert on repeated permission denials
- **Configuration Changes:** Alert on any configuration file changes
- **Rate Limit Exceeded:** Alert on unusual rate limit patterns
- **Error Spikes:** Alert on sudden increase in error rates
- **Security Vulnerabilities:** Alert on dependency vulnerability scans

---

## 10. Future Enhancements (Phase 2+)

### Planned Access Control Features
- **Multi-Factor Authentication (MFA):** Optional MFA for registered users
- **OAuth 2.0 Integration:** Social login (Google, Facebook, Twitter)
- **Role-Based UI:** Different UI elements based on user role
- **Fine-Grained Permissions:** More granular permission system
- **Attribute-Based Access Control (ABAC):** Dynamic permissions based on attributes
- **Time-Based Access Control:** Temporary access grants
- **IP-Based Access Control:** Geographic restrictions for admin access
- **Device Fingerprinting:** Detect suspicious login attempts
- **Account Lockout:** Automatic lockout after failed login attempts
- **Passwordless Authentication:** Magic link or biometric authentication

### Advanced Security Features
- **Web Application Firewall (WAF):** Protect against common attacks
- **DDoS Protection:** Mitigate distributed denial-of-service attacks
- **Bot Detection:** Identify and block malicious bots
- **API Security:** API key management, rate limiting per API key
- **Encryption at Rest:** Database encryption for sensitive data
- **Encryption in Transit:** TLS 1.3 for all communications
- **Key Rotation:** Regular rotation of encryption keys
- **Security Headers:** Enhanced security headers (CSP, HSTS, etc.)

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-27  
**Status**: Draft - Ready for Review  
**Next Step**: Proceed to `/aspec-10-object-lifecycle` - Generate Object Life Cycle (Step 10)
