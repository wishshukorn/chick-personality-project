-- ChickPersonality Database Schema
-- PostgreSQL Schema based on Data Model Specification (Step 4)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personality Types Table
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
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_priority_order CHECK (priority_order BETWEEN 1 AND 7)
);

-- Questions Table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_text TEXT NOT NULL,
  question_number INTEGER NOT NULL UNIQUE,
  category VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_question_number CHECK (question_number BETWEEN 1 AND 30)
);

-- Answer Options Table
CREATE TABLE answer_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text VARCHAR(255) NOT NULL,
  option_order INTEGER NOT NULL,
  scoring_weights JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_option_order CHECK (option_order BETWEEN 1 AND 5),
  UNIQUE (question_id, option_order)
);

-- Test Results Table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  share_token VARCHAR(32) NOT NULL UNIQUE,
  primary_personality_id UUID NOT NULL REFERENCES personality_types(id) ON DELETE RESTRICT,
  secondary_personality_ids JSONB,
  score_breakdown JSONB NOT NULL,
  total_time_seconds INTEGER NOT NULL,
  device_type VARCHAR(20) NOT NULL,
  user_agent VARCHAR(500),
  ip_address_hash VARCHAR(64),
  completed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_device_type CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  CONSTRAINT chk_total_time CHECK (total_time_seconds > 0)
);

-- Test Answers Table
CREATE TABLE test_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_result_id UUID NOT NULL REFERENCES test_results(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  answer_option_id UUID NOT NULL REFERENCES answer_options(id) ON DELETE RESTRICT,
  answered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (test_result_id, question_id)
);

-- Share Links Table
CREATE TABLE share_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_result_id UUID NOT NULL UNIQUE REFERENCES test_results(id) ON DELETE CASCADE,
  share_url VARCHAR(500) NOT NULL UNIQUE,
  share_token VARCHAR(32) NOT NULL UNIQUE,
  click_count INTEGER NOT NULL DEFAULT 0,
  last_clicked_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_click_count CHECK (click_count >= 0)
);

-- Analytics Events Table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  personality_type_slug VARCHAR(50),
  device_type VARCHAR(20),
  session_id VARCHAR(64),
  ip_address_hash VARCHAR(64),
  occurred_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_event_type CHECK (event_type IN (
    'page_view', 'test_started', 'question_answered', 'test_completed',
    'test_abandoned', 'share_clicked', 'share_completed', 'link_copied'
  ))
);

-- Configuration Table
CREATE TABLE configuration (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  description VARCHAR(500),
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_personality_types_active ON personality_types(is_active, priority_order);
CREATE INDEX idx_questions_active ON questions(is_active, question_number);
CREATE INDEX idx_answer_options_question ON answer_options(question_id, is_active, option_order);
CREATE INDEX idx_test_results_share_token ON test_results(share_token);
CREATE INDEX idx_test_results_personality ON test_results(primary_personality_id, completed_at);
CREATE INDEX idx_test_answers_result_question ON test_answers(test_result_id, question_id);
CREATE INDEX idx_share_links_token ON share_links(share_token);
CREATE INDEX idx_share_links_expires ON share_links(expires_at);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type, occurred_at);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id, occurred_at);
CREATE INDEX idx_configuration_key ON configuration(config_key);
CREATE INDEX idx_configuration_public ON configuration(is_public);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_personality_types_updated_at BEFORE UPDATE ON personality_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_answer_options_updated_at BEFORE UPDATE ON answer_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuration_updated_at BEFORE UPDATE ON configuration
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
