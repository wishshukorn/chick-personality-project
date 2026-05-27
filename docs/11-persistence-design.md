# Persistence Design

## Document Information
- **Project**: ChickPersonality
- **Based on**: Data Model (Step 4), Data Structure (Step 5), Object Life Cycle (Step 10)
- **Version**: 1.0
- **Last Updated**: 2026-05-27

---

## 1. Database Schema (SQL DDL)

### Extension Setup

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable JSONB functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Table: personality_types

```sql
CREATE TABLE personality_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    theme VARCHAR(100) NOT NULL,
    color_palette JSONB NOT NULL,
    icon_url VARCHAR(500),
    traits TEXT NOT NULL,
    description TEXT NOT NULL,
    strengths TEXT NOT NULL,
    weaknesses TEXT NOT NULL,
    compatibility_matrix JSONB NOT NULL,
    priority_order INTEGER NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_priority_order_range CHECK (priority_order BETWEEN 1 AND 7)
);

-- Indexes
CREATE INDEX idx_personality_types_active_priority ON personality_types(is_active, priority_order);
CREATE INDEX idx_personality_types_slug ON personality_types(slug);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_personality_types_updated_at BEFORE UPDATE ON personality_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Table: questions

```sql
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    question_number INTEGER NOT NULL UNIQUE,
    category VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_question_number_range CHECK (question_number BETWEEN 1 AND 30)
);

-- Indexes
CREATE INDEX idx_questions_active_number ON questions(is_active, question_number);
CREATE INDEX idx_questions_category ON questions(category);

-- Trigger for updated_at
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Table: answer_options

```sql
CREATE TABLE answer_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    option_order INTEGER NOT NULL,
    scoring_weights JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_option_order_range CHECK (option_order BETWEEN 1 AND 5),
    CONSTRAINT fk_answer_options_question FOREIGN KEY (question_id) 
        REFERENCES questions(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_answer_options_question_active_order ON answer_options(question_id, is_active, option_order);
CREATE INDEX idx_answer_options_question ON answer_options(question_id);

-- Unique constraint for option order within question
CREATE UNIQUE INDEX idx_answer_options_question_order ON answer_options(question_id, option_order) 
    WHERE is_active = true;

-- Trigger for updated_at
CREATE TRIGGER update_answer_options_updated_at BEFORE UPDATE ON answer_options
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Table: test_results

```sql
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    share_token VARCHAR(32) NOT NULL UNIQUE,
    primary_personality_id UUID NOT NULL,
    secondary_personality_ids JSONB,
    score_breakdown JSONB NOT NULL,
    total_time_seconds INTEGER NOT NULL,
    device_type VARCHAR(20) NOT NULL,
    user_agent VARCHAR(500),
    ip_address_hash VARCHAR(64),
    completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_total_time_positive CHECK (total_time_seconds > 0),
    CONSTRAINT chk_device_type_valid CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
    CONSTRAINT fk_test_results_personality FOREIGN KEY (primary_personality_id) 
        REFERENCES personality_types(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_test_results_share_token ON test_results(share_token);
CREATE INDEX idx_test_results_primary_personality ON test_results(primary_personality_id, completed_at);
CREATE INDEX idx_test_results_completed_at ON test_results(completed_at);

-- Trigger for updated_at (though this table is immutable after creation)
CREATE TRIGGER update_test_results_updated_at BEFORE UPDATE ON test_results
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Table: test_answers

```sql
CREATE TABLE test_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_result_id UUID NOT NULL,
    question_id UUID NOT NULL,
    answer_option_id UUID NOT NULL,
    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_test_answers_result FOREIGN KEY (test_result_id) 
        REFERENCES test_results(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_test_answers_question FOREIGN KEY (question_id) 
        REFERENCES questions(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_test_answers_option FOREIGN KEY (answer_option_id) 
        REFERENCES answer_options(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    
    CONSTRAINT uq_test_answers_result_question UNIQUE (test_result_id, question_id)
);

-- Indexes
CREATE INDEX idx_test_answers_result_question ON test_answers(test_result_id, question_id);
CREATE INDEX idx_test_answers_result ON test_answers(test_result_id);
CREATE INDEX idx_test_answers_question ON test_answers(question_id);
```

### Table: share_links

```sql
CREATE TABLE share_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_result_id UUID NOT NULL UNIQUE,
    share_url VARCHAR(500) NOT NULL UNIQUE,
    share_token VARCHAR(32) NOT NULL UNIQUE,
    click_count INTEGER NOT NULL DEFAULT 0,
    last_clicked_at TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_click_count_non_negative CHECK (click_count >= 0),
    CONSTRAINT fk_share_links_result FOREIGN KEY (test_result_id) 
        REFERENCES test_results(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_share_links_token ON share_links(share_token);
CREATE INDEX idx_share_links_expires_at ON share_links(expires_at);
```

### Table: analytics_events

```sql
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    personality_type_slug VARCHAR(50),
    device_type VARCHAR(20),
    session_id VARCHAR(64),
    ip_address_hash VARCHAR(64),
    occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_event_type_valid CHECK (event_type IN (
        'page_view', 'test_started', 'question_answered', 
        'test_completed', 'test_abandoned', 'share_clicked', 
        'share_completed', 'link_copied'
    ))
);

-- Indexes
CREATE INDEX idx_analytics_events_type_time ON analytics_events(event_type, occurred_at);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id, occurred_at);
CREATE INDEX idx_analytics_events_occurred_at ON analytics_events(occurred_at);
```

### Table: configurations

```sql
CREATE TABLE configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description VARCHAR(500),
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_is_public_valid CHECK (is_public IN (true, false))
);

-- Indexes
CREATE INDEX idx_configurations_key ON configurations(config_key);
CREATE INDEX idx_configurations_public ON configurations(is_public);

-- Trigger for updated_at
CREATE TRIGGER update_configurations_updated_at BEFORE UPDATE ON configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Table: audit_log (for tracking configuration changes)

```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    actor VARCHAR(255),
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
```

---

## 2. Index Strategy

### Index Summary Table

| Table | Index Name | Columns | Type | Purpose | Estimated Size |
|-------|------------|---------|------|---------|----------------|
| personality_types | idx_personality_types_active_priority | is_active, priority_order | BTREE | Query active types in priority order | Small |
| personality_types | idx_personality_types_slug | slug | BTREE | Lookup by slug | Small |
| questions | idx_questions_active_number | is_active, question_number | BTREE | Query active questions in order | Small |
| questions | idx_questions_category | category | BTREE | Filter by category | Small |
| answer_options | idx_answer_options_question_active_order | question_id, is_active, option_order | BTREE | Query active options for a question | Medium |
| answer_options | idx_answer_options_question | question_id | BTREE | Foreign key lookup | Medium |
| answer_options | idx_answer_options_question_order | question_id, option_order | BTREE (partial) | Unique order within active options | Medium |
| test_results | idx_test_results_share_token | share_token | BTREE | Share token lookup (high frequency) | Medium |
| test_results | idx_test_results_primary_personality | primary_personality_id, completed_at | BTREE | Analytics by personality type | Medium |
| test_results | idx_test_results_completed_at | completed_at | BTREE | Cleanup by date | Medium |
| test_answers | idx_test_answers_result_question | test_result_id, question_id | BTREE | Lookup answers for a result | Large |
| test_answers | idx_test_answers_result | test_result_id | BTREE | Foreign key lookup | Large |
| test_answers | idx_test_answers_question | question_id | BTREE | Analytics by question | Large |
| share_links | idx_share_links_token | share_token | BTREE | Share token lookup (high frequency) | Medium |
| share_links | idx_share_links_expires_at | expires_at | BTREE | Cleanup expired links | Medium |
| analytics_events | idx_analytics_events_type_time | event_type, occurred_at | BTREE | Analytics queries (high frequency) | Very Large |
| analytics_events | idx_analytics_events_session | session_id, occurred_at | BTREE | Session tracking | Very Large |
| analytics_events | idx_analytics_events_occurred_at | occurred_at | BTREE | Cleanup by date | Very Large |
| configurations | idx_configurations_key | config_key | BTREE | Config key lookup (high frequency) | Small |
| configurations | idx_configurations_public | is_public | BTREE | Query public configs | Small |
| audit_log | idx_audit_log_entity | entity_type, entity_id | BTREE | Audit trail queries | Medium |
| audit_log | idx_audit_log_created_at | created_at | BTREE | Time-based audit queries | Medium |

### Index Design Rationale

**High-Frequency Read Indexes:**
- `idx_test_results_share_token`: Used on every shared result access (primary lookup)
- `idx_share_links_token`: Used on every share link access (primary lookup)
- `idx_analytics_events_type_time`: Used for analytics dashboard queries
- `idx_configurations_key`: Used on every configuration load

**Composite Indexes for Query Optimization:**
- `idx_personality_types_active_priority`: Supports filtering active types and ordering by priority
- `idx_answer_options_question_active_order`: Supports querying options for a specific question with filtering and ordering
- `idx_test_answers_result_question`: Supports retrieving all answers for a test result efficiently
- `idx_analytics_events_session`: Supports session-based analytics queries

**Time-Based Indexes for Cleanup:**
- `idx_test_results_completed_at`: Supports archival job (90-day retention)
- `idx_share_links_expires_at`: Supports expired link cleanup (30-day expiry)
- `idx_analytics_events_occurred_at`: Supports event cleanup (1-year retention)

**Partial Index for Uniqueness:**
- `idx_answer_options_question_order`: Partial unique index on active options only, allowing inactive options to have duplicate orders

### Index Maintenance Strategy

**Reindex Schedule:**
- Weekly reindex for high-write tables (test_results, test_answers, analytics_events)
- Monthly reindex for low-write tables (personality_types, questions, configurations)

**Index Statistics:**
- Run `ANALYZE` daily on all tables
- Update statistics after bulk data operations

**Index Monitoring:**
- Monitor index usage with `pg_stat_user_indexes`
- Remove unused indexes after 30 days of no usage
- Monitor index bloat and rebuild when > 50% bloat

---

## 3. Storage Strategy

### Primary Database

**Database Engine**: PostgreSQL 15+
**Version**: Latest stable release
**Deployment**: Managed service (AWS RDS, Google Cloud SQL, or Azure Database for PostgreSQL)

**Configuration:**
- **Instance Type**: db.t3.medium (2 vCPU, 4 GB RAM) for Phase 1
- **Storage**: 100 GB SSD (gp3) with auto-scaling
- **IOPS**: 3,000 baseline, 12,000 max
- **Multi-AZ**: Yes for production
- **Backup Retention**: 7 days (configurable up to 35 days)
- **Encryption**: At rest (AES-256) and in transit (TLS 1.3)

**Connection Pooling:**
- Use PgBouncer for connection pooling
- Pool size: 20 connections (Phase 1)
- Max client connections: 100

### Caching Layer

**Cache Engine**: Redis 7+
**Deployment**: Managed service (ElastiCache, Memorystore, or Azure Cache)

**Configuration:**
- **Instance Type**: cache.t3.small (1 vCPU, 1.5 GB RAM) for Phase 1
- **Memory**: 1.5 GB
- **Eviction Policy**: allkeys-lru
- **Persistence**: Disabled (Phase 1 - cache can be rebuilt)
- **Replication**: Yes (1 replica for high availability)

**Cache Strategy:**
- **Personality Types**: Cache for 1 hour (config_key: `personality_types:active`)
- **Questions**: Cache for 1 hour (config_key: `questions:active`)
- **Public Configuration**: Cache for 5 minutes (config_key: `config:public:{key}`)
- **Test Results**: Cache for 30 minutes (config_key: `result:{share_token}`)
- **Share Links**: Cache for 15 minutes (config_key: `share:{share_token}`)

**Cache Invalidation:**
- Manual invalidation on configuration updates
- TTL-based expiration for all cached data
- Cache busting on critical errors

### File Storage

**Storage Service**: AWS S3 (or equivalent)
**Bucket Name**: `chickpersonality-{environment}`

**Configuration:**
- **Storage Class**: Standard (for frequently accessed images)
- **Versioning**: Enabled
- **Encryption**: Server-side encryption (SSE-S3)
- **Lifecycle Rules**:
  - Transition to Intelligent-Tiering after 30 days
  - Transition to Glacier Deep Archive after 90 days
  - Delete after 1 year

**Directory Structure:**
```
s3://chickpersonality-prod/
├── images/
│   ├── personality-icons/
│   └── share-cards/
├── backups/
│   ├── daily/
│   └── weekly/
└── exports/
    └── analytics/
```

**CDN Integration:**
- Use CloudFront (or Cloudflare) for image delivery
- Cache TTL: 1 year for static images
- Cache TTL: 1 hour for generated share cards

### Search Index

**Search Engine**: Not required for Phase 1
**Future Phase 2**: Consider Elasticsearch if search functionality is needed for:
- Searching personality type descriptions
- Full-text search on questions
- Analytics event search

### Data Partitioning Strategy

**Phase 1**: No partitioning required
- Data volume is low (< 100 GB expected in first year)
- All tables fit in single database instance

**Phase 2+**: Consider partitioning for:
- **analytics_events**: Partition by month on `occurred_at` column
  - Rationale: High write volume, time-based cleanup
  - Partition key: `occurred_at`
  - Partition interval: Monthly
- **test_results**: Partition by quarter on `completed_at` column
  - Rationale: Time-based archival and cleanup
  - Partition key: `completed_at`
  - Partition interval: Quarterly

**Partitioning Example (Phase 2):**
```sql
-- Partition analytics_events by month
CREATE TABLE analytics_events (
    -- Same schema as above
) PARTITION BY RANGE (occurred_at);

-- Create partitions
CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE analytics_events_2026_02 PARTITION OF analytics_events
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Default partition for future data
CREATE TABLE analytics_events_default PARTITION OF analytics_events
    DEFAULT;
```

---

## 4. Backup and Recovery

### Backup Strategy

**Automated Backups:**
- **Frequency**: Daily full backup at 2:00 AM UTC
- **Retention**: 7 days (configurable up to 35 days)
- **Type**: Point-in-time recovery (PITR) enabled
- **Compression**: Enabled
- **Encryption**: Encrypted backups

**Manual Backups:**
- **Pre-deployment**: Manual snapshot before major configuration changes
- **Retention**: 30 days
- **Storage**: Separate S3 bucket for manual backups

**Backup Types:**
1. **Full Backup**: Daily, includes all tables and data
2. **Incremental Backup**: Not used (PITR provides continuous backup)
3. **Transaction Log**: Continuous (WAL archiving)

### Recovery Objectives

**Recovery Point Objective (RPO):**
- **Production**: 5 minutes (PITR enables recovery to any point within retention window)
- **Development/Staging**: 1 hour

**Recovery Time Objective (RTO):**
- **Production**: 1 hour for full recovery
- **Development/Staging**: 4 hours

### Recovery Procedures

**Scenario 1: Accidental Data Deletion**
1. Identify point in time before deletion
2. Restore database to point-in-time snapshot
3. Verify data integrity
4. Cutover to restored instance
5. **Estimated Time**: 30-60 minutes

**Scenario 2: Database Corruption**
1. Promote read replica to primary (if available)
2. Restore from latest backup to new instance
3. Verify data integrity
4. Update DNS to point to new instance
5. **Estimated Time**: 1-2 hours

**Scenario 3: Regional Outage**
1. Failover to secondary region (if configured)
2. Promote standby database to primary
3. Update DNS to point to secondary region
4. **Estimated Time**: 5-15 minutes (with automated failover)

**Scenario 4: Configuration Error**
1. Rollback to previous configuration version
2. Use audit log to identify changes
3. Manually revert if needed
4. **Estimated Time**: 5-15 minutes

### Disaster Recovery Plan

**Primary Region**: us-east-1
**Secondary Region**: us-west-2 (Phase 2+)

**Failover Triggers:**
- Primary region unavailable > 5 minutes
- Database corruption detected
- Security breach in primary region

**Failback Procedure:**
1. Restore primary region to healthy state
2. Sync data from secondary to primary
3. Verify data consistency
4. Update DNS to point back to primary
5. **Estimated Time**: 1-2 hours

---

## 5. Migration Strategy

### Migration Tool

**Tool**: Flyway (database migration framework)
**Version**: 9.x
**Language**: SQL-based migrations

**Configuration:**
```yaml
flyway:
  locations: filesystem:./migrations
  baselineOnMigrate: true
  baselineVersion: 0
  outOfOrder: false
  validateOnMigrate: true
```

### Migration Versioning

**Naming Convention**: `V{version}__{description}.sql`
- Example: `V1__create_initial_schema.sql`
- Example: `V2__add_audit_log_table.sql`
- Example: `V3__add_personality_type_indexes.sql`

**Version Strategy:**
- Sequential versioning (V1, V2, V3, ...)
- No version skipping allowed
- Each migration is idempotent
- Rollback migrations provided for critical changes

### Migration Directory Structure

```
migrations/
├── V1__create_initial_schema.sql
├── V2__create_audit_log_table.sql
├── V3__add_personality_type_indexes.sql
├── V4__add_analytics_events_indexes.sql
├── V5__add_configuration_indexes.sql
├── R3__remove_personality_type_indexes.sql  (Rollback for V3)
└── ...
```

### Sample Migrations

**V1__create_initial_schema.sql:**
```sql
-- Create all tables in dependency order
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables in order: personality_types, questions, answer_options, 
-- test_results, test_answers, share_links, analytics_events, configurations
-- (Full DDL as shown in Section 1)
```

**V2__create_audit_log_table.sql:**
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    actor VARCHAR(255),
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
```

**V3__add_personality_type_indexes.sql:**
```sql
CREATE INDEX idx_personality_types_active_priority ON personality_types(is_active, priority_order);
CREATE INDEX idx_personality_types_slug ON personality_types(slug);
```

**R3__remove_personality_type_indexes.sql (Rollback):**
```sql
DROP INDEX IF EXISTS idx_personality_types_active_priority;
DROP INDEX IF EXISTS idx_personality_types_slug;
```

### Rollback Procedures

**Automatic Rollback:**
- Flyway supports rollback with undo scripts
- Rollback scripts named: `R{version}__{description}.sql`
- Rollback to previous version on failure

**Manual Rollback:**
1. Identify failed migration version
2. Manually revert changes using SQL
3. Update Flyway schema history table
4. Re-run migration if needed

**Rollback Safety:**
- Test rollback in development environment first
- Never rollback in production without approval
- Document rollback reason in audit log

### Migration Deployment Process

**Development:**
1. Create migration file
2. Test locally with Flyway
3. Run migration on development database
4. Verify changes
5. Commit migration file to version control

**Staging:**
1. Pull migration from version control
2. Run Flyway migrate on staging database
3. Verify changes with test data
4. Run rollback test
5. Approve for production

**Production:**
1. Schedule maintenance window (if needed)
2. Backup production database
3. Run Flyway migrate on production database
4. Verify changes
5. Monitor application logs
6. Rollback if issues detected

### Migration Best Practices

- **Idempotency**: All migrations should be safe to run multiple times
- **Backward Compatibility**: Avoid breaking changes, use additive migrations
- **Testing**: Test migrations on copy of production data
- **Documentation**: Document migration purpose and impact
- **Monitoring**: Monitor migration performance and errors
- **Rollback Plan**: Always have a rollback plan for production migrations

---

## 6. Query Patterns

### Query Pattern Summary

| Query | Frequency | Tables | Expected Performance | Index Used |
|-------|-----------|--------|---------------------|------------|
| Get active personality types | High | personality_types | < 10ms | idx_personality_types_active_priority |
| Get personality type by slug | High | personality_types | < 10ms | idx_personality_types_slug |
| Get active questions with options | High | questions, answer_options | < 50ms | idx_questions_active_number, idx_answer_options_question_active_order |
| Get test result by share token | High | test_results, personality_types | < 20ms | idx_test_results_share_token |
| Get share link by token | High | share_links | < 10ms | idx_share_links_token |
| Get public configuration | High | configurations | < 10ms | idx_configurations_key, idx_configurations_public |
| Save test result | Medium | test_results, test_answers | < 100ms | idx_test_results_share_token (write) |
| Log analytics event | High | analytics_events | < 50ms | idx_analytics_events_type_time (write) |
| Get test result analytics | Medium | test_results | < 100ms | idx_test_results_primary_personality |
| Get analytics by event type | Medium | analytics_events | < 200ms | idx_analytics_events_type_time |
| Get session analytics | Medium | analytics_events | < 100ms | idx_analytics_events_session |
| Cleanup expired share links | Low (daily) | share_links | < 1s | idx_share_links_expires_at |
| Archive old test results | Low (daily) | test_results | < 5s | idx_test_results_completed_at |
| Delete old analytics events | Low (daily) | analytics_events | < 10s | idx_analytics_events_occurred_at |

### Detailed Query Patterns

**Query 1: Get Active Personality Types**
```sql
SELECT id, name, slug, theme, color_palette, icon_url, traits, 
       description, strengths, weaknesses, compatibility_matrix, priority_order
FROM personality_types
WHERE is_active = true
ORDER BY priority_order;
```
- **Frequency**: High (on every test completion)
- **Performance**: < 10ms
- **Index**: idx_personality_types_active_priority
- **Cache**: 1 hour TTL

**Query 2: Get Active Questions with Answer Options**
```sql
SELECT q.id, q.question_text, q.question_number, q.category,
       ao.id as option_id, ao.option_text, ao.option_order, ao.scoring_weights
FROM questions q
LEFT JOIN answer_options ao ON q.id = ao.question_id AND ao.is_active = true
WHERE q.is_active = true
ORDER BY q.question_number, ao.option_order;
```
- **Frequency**: High (on every test start)
- **Performance**: < 50ms
- **Index**: idx_questions_active_number, idx_answer_options_question_active_order
- **Cache**: 1 hour TTL

**Query 3: Get Test Result by Share Token**
```sql
SELECT tr.id, tr.share_token, tr.score_breakdown, tr.total_time_seconds, 
       tr.device_type, tr.completed_at,
       pt.id as personality_id, pt.name, pt.slug, pt.theme, pt.color_palette,
       pt.icon_url, pt.traits, pt.description, pt.strengths, pt.weaknesses,
       pt.compatibility_matrix
FROM test_results tr
JOIN personality_types pt ON tr.primary_personality_id = pt.id
WHERE tr.share_token = $1;
```
- **Frequency**: High (on every share link access)
- **Performance**: < 20ms
- **Index**: idx_test_results_share_token
- **Cache**: 30 minutes TTL

**Query 4: Save Test Result with Answers**
```sql
-- Insert test result
INSERT INTO test_results (id, share_token, primary_personality_id, 
                          secondary_personality_ids, score_breakdown, 
                          total_time_seconds, device_type, user_agent, 
                          ip_address_hash, completed_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING id;

-- Bulk insert answers
INSERT INTO test_answers (id, test_result_id, question_id, answer_option_id, answered_at)
VALUES 
    (uuid_generate_v4(), $1, $2, $3, CURRENT_TIMESTAMP),
    (uuid_generate_v4(), $1, $4, $5, CURRENT_TIMESTAMP),
    ...
ON CONFLICT (test_result_id, question_id) DO NOTHING;
```
- **Frequency**: Medium (on every test completion)
- **Performance**: < 100ms
- **Transaction**: Single transaction for result + answers
- **Index**: idx_test_results_share_token (write), idx_test_answers_result_question (write)

**Query 5: Log Analytics Event**
```sql
INSERT INTO analytics_events (id, event_type, event_data, personality_type_slug, 
                               device_type, session_id, ip_address_hash, occurred_at)
VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP);
```
- **Frequency**: High (on every user action)
- **Performance**: < 50ms
- **Index**: idx_analytics_events_type_time (write)
- **Async**: Consider async insertion for non-critical events

**Query 6: Get Analytics by Event Type and Date Range**
```sql
SELECT event_type, COUNT(*) as count,
       COUNT(DISTINCT session_id) as unique_sessions,
       COUNT(DISTINCT ip_address_hash) as unique_ips
FROM analytics_events
WHERE event_type = $1
  AND occurred_at BETWEEN $2 AND $3
GROUP BY event_type;
```
- **Frequency**: Medium (analytics dashboard queries)
- **Performance**: < 200ms
- **Index**: idx_analytics_events_type_time
- **Cache**: 5 minutes TTL for aggregated results

**Query 7: Cleanup Expired Share Links**
```sql
DELETE FROM share_links
WHERE expires_at < CURRENT_TIMESTAMP;
```
- **Frequency**: Low (daily maintenance job)
- **Performance**: < 1s
- **Index**: idx_share_links_expires_at
- **Batch**: Delete in batches of 1000 to avoid long-running transactions

**Query 8: Archive Old Test Results**
```sql
-- Mark as archived (soft delete)
UPDATE test_results
SET archived_at = CURRENT_TIMESTAMP
WHERE completed_at < CURRENT_TIMESTAMP - INTERVAL '90 days'
  AND archived_at IS NULL;
```
- **Frequency**: Low (daily maintenance job)
- **Performance**: < 5s
- **Index**: idx_test_results_completed_at
- **Note**: Consider hard delete after 180 days

**Query 9: Get Public Configuration**
```sql
SELECT config_key, config_value
FROM configurations
WHERE is_public = true;
```
- **Frequency**: High (on every page load)
- **Performance**: < 10ms
- **Index**: idx_configurations_public
- **Cache**: 5 minutes TTL

### Query Optimization Guidelines

**Read Optimization:**
- Use appropriate indexes for all frequent queries
- Cache high-frequency read queries
- Use SELECT only required columns (avoid SELECT *)
- Use JOIN instead of subqueries when possible
- Use EXPLAIN ANALYZE to verify query plans

**Write Optimization:**
- Batch insert operations when possible
- Use transactions for related writes
- Avoid long-running transactions
- Consider async writes for non-critical data
- Monitor write performance and optimize indexes

**Connection Management:**
- Use connection pooling (PgBouncer)
- Set appropriate connection limits
- Monitor connection pool usage
- Close connections when not needed
- Use prepared statements for repeated queries

---

## 7. Data Archival and Cleanup

### Archival Strategy

**Test Results:**
- **Active Period**: 0-90 days
- **Archival Period**: 90-180 days
- **Deletion**: After 180 days
- **Archive Location**: Cold storage (S3 Glacier)
- **Archive Format**: JSON or CSV

**Share Links:**
- **Active Period**: 0-30 days
- **Deletion**: After 30 days (no archival)
- **Cleanup Method**: Hard delete

**Analytics Events:**
- **Active Period**: 0-365 days
- **Aggregation**: Daily/monthly statistics stored permanently
- **Deletion**: After 365 days (raw events)
- **Archive Location**: Aggregated data in database, raw events deleted

### Cleanup Jobs

**Job 1: Delete Expired Share Links**
- **Schedule**: Daily at 3:00 AM UTC
- **Query**: `DELETE FROM share_links WHERE expires_at < CURRENT_TIMESTAMP`
- **Batch Size**: 1000 records per batch
- **Expected Runtime**: < 1 minute
- **Monitoring**: Log deleted count

**Job 2: Archive Old Test Results**
- **Schedule**: Daily at 4:00 AM UTC
- **Query**: `UPDATE test_results SET archived_at = CURRENT_TIMESTAMP WHERE completed_at < CURRENT_TIMESTAMP - INTERVAL '90 days' AND archived_at IS NULL`
- **Batch Size**: 1000 records per batch
- **Expected Runtime**: < 5 minutes
- **Monitoring**: Log archived count

**Job 3: Delete Archived Test Results**
- **Schedule**: Daily at 5:00 AM UTC
- **Query**: `DELETE FROM test_results WHERE archived_at < CURRENT_TIMESTAMP - INTERVAL '90 days'`
- **Batch Size**: 1000 records per batch
- **Expected Runtime**: < 5 minutes
- **Monitoring**: Log deleted count

**Job 4: Aggregate Analytics Events**
- **Schedule**: Hourly
- **Query**: Aggregate events by type, personality type, device type
- **Output**: Store in analytics_aggregations table
- **Expected Runtime**: < 2 minutes
- **Monitoring**: Log aggregation count

**Job 5: Delete Old Analytics Events**
- **Schedule**: Daily at 6:00 AM UTC
- **Query**: `DELETE FROM analytics_events WHERE occurred_at < CURRENT_TIMESTAMP - INTERVAL '365 days'`
- **Batch Size**: 10000 records per batch
- **Expected Runtime**: < 10 minutes
- **Monitoring**: Log deleted count

### Cleanup Monitoring

**Metrics to Track:**
- Records deleted per job
- Job execution time
- Job failure rate
- Database size before/after cleanup
- Storage cost savings

**Alerting:**
- Alert if job fails
- Alert if job takes > 2x expected time
- Alert if database size grows > 20% month-over-month
- Alert if cleanup deletes > 10% of records

---

## 8. Security Considerations

### Database Security

**Authentication:**
- Strong password policy (16+ characters, special chars)
- Separate database users for application and admin
- Use IAM authentication (if using AWS RDS)
- Rotate credentials every 90 days

**Authorization:**
- Least privilege principle
- Application user: SELECT, INSERT, UPDATE on required tables
- Admin user: Full access
- Read-only user: SELECT only for analytics

**Network Security:**
- VPC isolation (private subnets)
- Security groups restrict access
- SSL/TLS required for all connections
- IP whitelist for admin access

**Data Encryption:**
- At rest: AES-256 (managed by cloud provider)
- In transit: TLS 1.3
- Encryption keys managed by KMS (AWS) or equivalent

### PII Protection

**Hashed Fields:**
- IP addresses: SHA-256 hash before storage
- Session IDs: Random UUID, no user linkage

**No PII Storage:**
- No names, emails, or phone numbers stored
- No user accounts in Phase 1
- User agents stored only for analytics

**Audit Logging:**
- All configuration changes logged
- All data access logged (Phase 2)
- Audit log retained for 1 year

### Access Control

**Database Access:**
- Application: Limited to application user
- Administrators: Limited to admin user
- Analytics: Read-only user for analytics dashboard

**Configuration Access:**
- Public configs: Accessible to frontend
- Private configs: Server-side only
- API keys: Never stored in database, use environment variables

---

## 9. Performance Monitoring

### Key Metrics

**Database Performance:**
- Connection pool utilization
- Query execution time (P95, P99)
- Slow query log (queries > 1s)
- Index usage statistics
- Table bloat

**Storage Performance:**
- Disk I/O operations
- Storage utilization
- Backup size
- Cache hit ratio

**Application Performance:**
- Database query latency
- Cache hit ratio
- Error rate (database errors)
- Transaction throughput

### Monitoring Tools

**Native Tools:**
- PostgreSQL: pg_stat_statements, pg_stat_user_tables
- Redis: INFO command, SLOWLOG

**External Tools:**
- AWS CloudWatch (if using AWS RDS)
- Datadog or New Relic for comprehensive monitoring
- Prometheus + Grafana for custom dashboards

### Alerting Rules

**Critical Alerts:**
- Database connection pool > 80% utilization
- Query latency P99 > 500ms
- Error rate > 1%
- Database unavailable > 1 minute

**Warning Alerts:**
- Query latency P95 > 200ms
- Cache hit ratio < 80%
- Storage utilization > 70%
- Slow query rate > 10 per hour

---

## 10. Scalability Considerations

### Vertical Scaling (Phase 1)

**Current Capacity:**
- Database: db.t3.medium (2 vCPU, 4 GB RAM)
- Cache: cache.t3.small (1 vCPU, 1.5 GB RAM)
- Expected load: 1,000 tests/day, 10,000 analytics events/day

**Scaling Triggers:**
- CPU utilization > 70% for 1 hour
- Memory utilization > 80% for 1 hour
- Query latency P99 > 500ms
- Connection pool > 80% utilization

**Scaling Path:**
- Database: db.t3.medium → db.t3.large → db.m5.large
- Cache: cache.t3.small → cache.t3.medium → cache.m5.large

### Horizontal Scaling (Phase 2+)

**Read Replicas:**
- Add 1-2 read replicas for analytics queries
- Direct read traffic to replicas
- Primary handles only writes

**Database Sharding:**
- Consider sharding by tenant if multi-tenant (Phase 2+)
- Shard key: user_id or tenant_id
- Shard count: Start with 2 shards, scale as needed

**Connection Pooling:**
- Use PgBouncer for connection pooling
- Pool size: 20 connections per instance
- Max client connections: 100 per instance

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-27  
**Status**: Draft - Ready for Review  
**Next Step**: Proceed to `/aspec-12-architecture` - Generate Architecture Summary (Step 12)
