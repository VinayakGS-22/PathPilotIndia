export type UserRole = 'student' | 'parent' | 'admin';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type LinkStatus = 'pending' | 'approved' | 'rejected';
export type EducationStage =
  | 'school_8_10'
  | 'school_11_12'
  | 'diploma'
  | 'undergraduate'
  | 'graduate'
  | 'parent_planning';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approval_status: ApprovalStatus;
  email_verified?: boolean;
  education_stage?: EducationStage;
  onboarding_completed: boolean;
  city?: string;
  state?: string;
  phone?: string;
  avatar_url?: string;
  notifications_enabled: boolean;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  name: string;
  class_level?: string;
  education_stage?: EducationStage;
  board?: string;
  school_name?: string;
  state: string;
  city: string;
  interests?: string[];
  subjects?: string[];
  budget?: string;
  target_careers?: string[];
  marks_percentage?: number;
  created_at: string;
}

export interface ParentChildLink {
  id: string;
  student_user_id: string;
  parent_user_id: string;
  parent_email?: string;
  relationship?: 'father' | 'mother' | 'guardian';
  status: LinkStatus;
  created_at: string;
  student_name?: string;
  parent_name?: string;
}

export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  education_stage?: string;
  class_level?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verification_provider?: string;
  verified_name_match?: boolean;
  verified_address_match?: boolean;
  created_at: string;
}

export interface Career {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  what_they_do?: string;
  who_should_choose?: string;
  subjects_required?: string[];
  skills_to_learn?: string[];
  tools?: string[];
  salary_range: string;
  future_demand_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  roadmap: RoadmapItem[];
  free_courses?: LearningResource[];
  youtube_channels?: string[];
  certifications?: string[];
  interview_prep?: string;
  projects?: string[];
  alternative_careers?: string[];
}

export interface RoadmapItem {
  class: string;
  actions: string[];
}

export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  category: string;
  courses: string[];
  exams: string[];
  fees_min?: number;
  fees_max?: number;
  average_package: string;
  highest_package?: string;
  website: string;
  source_url?: string;
  last_verified_date?: string;
  type: 'government' | 'private' | 'deemed';
  ranking_tier?: string;
  description?: string;
  established_year?: number;
  campus_size?: string;
  total_students?: number;
  placement_percentage?: number;
  accepted_exams?: string[];
  approx_fees?: string;
  ranking?: number;
}

export interface Scholarship {
  id: string;
  name: string;
  eligibility: string;
  income_limit: string;
  state: string;
  category?: string;
  deadline: string;
  website: string;
  amount: string;
  description?: string;
  provider?: string;
  target_group?: string;
  applicable_state?: string;
}

export interface Exam {
  id: string;
  name: string;
  category: string;
  career_stream?: string;
  eligibility: string;
  age_limit?: string;
  pattern?: string;
  official_website: string;
  description?: string;
  timeline?: string;
  frequency?: string;
  difficulty?: string;
  subjects?: string[];
  exam_date?: string;
}

export interface MockTest {
  id: string;
  exam_name: string;
  title: string;
  duration_minutes: number;
  total_questions: number;
  total_marks?: number;
  passing_marks?: number;
  subjects?: string[];
  instructions?: string;
  is_active: boolean;
  created_at: string;
}

export interface MockQuestion {
  id: string;
  mock_test_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  subject?: string;
  difficulty?: string;
}

export interface MockResult {
  id: string;
  user_id: string;
  mock_test_id: string;
  score: number;
  total_marks?: number;
  answers: Record<string, number>;
  time_taken_seconds?: number;
  completed_at: string;
  mock_test_title?: string;
}

export interface SavedExam {
  id: string;
  user_id: string;
  exam_id: string;
  exam_name: string;
  status: 'planned' | 'preparing' | 'completed';
  target_date?: string;
  notes?: string;
  added_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  student_id?: string;
  student_name: string;
  title: string;
  class_level?: string;
  education_stage?: string;
  interests?: string[];
  strengths?: string[];
  career_matches?: Career[];
  college_recommendations?: College[];
  scholarship_matches?: Scholarship[];
  exam_suggestions?: Exam[];
  roadmap?: RoadmapItem[];
  created_at: string;
  top_careers?: Career[];
  recommended_colleges?: College[];
  scholarships?: Scholarship[];
  exams?: Exam[];
}

export interface ProjectLead {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  branch: string;
  project_topic?: string;
  deadline?: string;
  budget?: string;
  documentation_needed: boolean;
  presentation_needed: boolean;
  additional_requirements?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_name: string;
  status: 'active' | 'expired' | 'cancelled' | 'transferred';
  started_at: string;
  expires_at?: string;
  amount_paid?: number;
  payment_id?: string;
  transferable: boolean;
  transferred_to_family_member_id?: string;
}

export interface LearningResource {
  id?: string;
  name: string;
  category: string;
  url: string;
  type?: 'course' | 'platform' | 'youtube' | 'docs' | 'tool';
  is_free?: boolean;
  best_for?: string;
  description?: string;
}

export interface AnalyticsEvent {
  id: string;
  user_id?: string;
  event_name: string;
  metadata?: Record<string, unknown>;
  session_id?: string;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  description?: string;
  transferable?: boolean;
}
