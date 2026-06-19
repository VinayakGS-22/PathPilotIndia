-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (clean slate for upgrade)
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS project_leads CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS mock_results CASCADE;
DROP TABLE IF EXISTS mock_questions CASCADE;
DROP TABLE IF EXISTS mock_tests CASCADE;
DROP TABLE IF EXISTS saved_exams CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS parent_child_links CASCADE;
DROP TABLE IF EXISTS scholarships CASCADE;
DROP TABLE IF EXISTS exams CASCADE;
DROP TABLE IF EXISTS colleges CASCADE;
DROP TABLE IF EXISTS careers CASCADE;
DROP TABLE IF EXISTS learning_resources CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create ENUMs
CREATE TYPE user_role AS ENUM ('student', 'parent', 'admin');
CREATE TYPE app_approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE link_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table (extends auth.users via id reference)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  approval_status app_approval_status NOT NULL DEFAULT 'pending',
  education_stage TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  phone TEXT,
  state TEXT,
  city TEXT,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class_level TEXT,
  education_stage TEXT,
  board TEXT,
  school_name TEXT,
  state TEXT,
  city TEXT,
  interests TEXT[],
  subjects TEXT[],
  budget TEXT,
  target_careers TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parent-child links table
CREATE TABLE parent_child_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_email TEXT,
  relationship TEXT CHECK (relationship IN ('father', 'mother', 'guardian')),
  status link_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_user_id, parent_user_id)
);

-- Family members table (for plan transfer)
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  education_stage TEXT,
  class_level TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_provider TEXT,
  verified_name_match BOOLEAN,
  verified_address_match BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Colleges table
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  courses TEXT[],
  exams TEXT[],
  fees_min INTEGER,
  fees_max INTEGER,
  average_package TEXT,
  highest_package TEXT,
  website TEXT,
  source_url TEXT,
  last_verified_date DATE,
  type TEXT CHECK (type IN ('government', 'private', 'deemed')),
  ranking_tier TEXT,
  description TEXT,
  established_year INTEGER,
  campus_size TEXT,
  total_students INTEGER,
  placement_percentage INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scholarships table
CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  eligibility TEXT,
  income_limit TEXT,
  state TEXT,
  category TEXT,
  website TEXT,
  deadline TEXT,
  amount TEXT,
  description TEXT,
  provider TEXT,
  target_group TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exams table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  eligibility TEXT,
  age_limit TEXT,
  pattern TEXT,
  official_website TEXT,
  description TEXT,
  timeline TEXT,
  frequency TEXT,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mock tests table
CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_name TEXT NOT NULL,
  title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  total_marks INTEGER,
  passing_marks INTEGER,
  subjects TEXT[],
  instructions TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mock questions table
CREATE TABLE mock_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  subject TEXT,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mock results table
CREATE TABLE mock_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_marks INTEGER,
  answers JSONB,
  time_taken_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved exams table
CREATE TABLE saved_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'preparing', 'completed')),
  target_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exam_id)
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB,
  student_name TEXT,
  class_level TEXT,
  education_stage TEXT,
  interests TEXT[],
  strengths TEXT[],
  career_matches JSONB,
  college_recommendations JSONB,
  scholarship_matches JSONB,
  exam_suggestions JSONB,
  roadmap JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  metadata JSONB,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project leads table
CREATE TABLE project_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  branch TEXT NOT NULL,
  project_topic TEXT,
  deadline TEXT,
  budget TEXT,
  documentation_needed BOOLEAN DEFAULT FALSE,
  presentation_needed BOOLEAN DEFAULT FALSE,
  additional_requirements TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'transferred')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  amount_paid INTEGER,
  payment_id TEXT,
  transferable BOOLEAN DEFAULT FALSE,
  transferred_to_family_member_id UUID REFERENCES family_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers table
CREATE TABLE careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  what_they_do TEXT,
  who_should_choose TEXT,
  subjects_required TEXT[],
  skills_to_learn TEXT[],
  tools TEXT[],
  salary_range TEXT,
  future_demand_score INTEGER,
  risk_level TEXT,
  roadmap JSONB,
  free_courses JSONB,
  youtube_channels TEXT[],
  certifications TEXT[],
  interview_prep TEXT,
  projects TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning resources table
CREATE TABLE learning_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT CHECK (type IN ('course', 'platform', 'youtube', 'docs', 'tool')),
  is_free BOOLEAN DEFAULT TRUE,
  best_for TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
