-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_child_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profile" ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- Students policies
CREATE POLICY "Users can view own students" ON students FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own students" ON students FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own students" ON students FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own students" ON students FOR DELETE
  USING (user_id = auth.uid());

CREATE POLICY "Parents can view linked students" ON students FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_child_links 
    WHERE parent_user_id = auth.uid() 
    AND student_user_id = students.user_id 
    AND status = 'approved'
  ));

CREATE POLICY "Admins can view all students" ON students FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Parent-child links policies
CREATE POLICY "Users can view own links" ON parent_child_links FOR SELECT
  USING (student_user_id = auth.uid() OR parent_user_id = auth.uid());

CREATE POLICY "Users can create links" ON parent_child_links FOR INSERT
  WITH CHECK (student_user_id = auth.uid() OR parent_user_id = auth.uid());

CREATE POLICY "Users can update own links" ON parent_child_links FOR UPDATE
  USING (student_user_id = auth.uid() OR parent_user_id = auth.uid());

CREATE POLICY "Users can delete own links" ON parent_child_links FOR DELETE
  USING (student_user_id = auth.uid() OR parent_user_id = auth.uid());

CREATE POLICY "Admins can view all links" ON parent_child_links FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Family members policies
CREATE POLICY "Users can view own family members" ON family_members FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own family members" ON family_members FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own family members" ON family_members FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own family members" ON family_members FOR DELETE
  USING (user_id = auth.uid());

-- Colleges policies (viewable by all authenticated users)
CREATE POLICY "Colleges viewable by authenticated" ON colleges FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage colleges" ON colleges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Scholarships policies (viewable by all authenticated users)
CREATE POLICY "Scholarships viewable by authenticated" ON scholarships FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage scholarships" ON scholarships FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Exams policies (viewable by all authenticated users)
CREATE POLICY "Exams viewable by authenticated" ON exams FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage exams" ON exams FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Mock tests policies
CREATE POLICY "Mock tests viewable by authenticated" ON mock_tests FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage mock tests" ON mock_tests FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Mock questions policies
CREATE POLICY "Mock questions viewable by authenticated" ON mock_questions FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage mock questions" ON mock_questions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Mock results policies
CREATE POLICY "Users view own results" ON mock_results FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users create own results" ON mock_results FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Parents view linked results" ON mock_results FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_child_links 
    WHERE parent_user_id = auth.uid() 
    AND student_user_id = mock_results.user_id 
    AND status = 'approved'
  ));

CREATE POLICY "Admins view all results" ON mock_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Saved exams policies
CREATE POLICY "Users manage own saved exams" ON saved_exams FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Parents view linked saved exams" ON saved_exams FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_child_links 
    WHERE parent_user_id = auth.uid() 
    AND student_user_id = saved_exams.user_id 
    AND status = 'approved'
  ));

-- Reports policies
CREATE POLICY "Users view own reports" ON reports FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users create own reports" ON reports FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own reports" ON reports FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users delete own reports" ON reports FOR DELETE
  USING (user_id = auth.uid());

CREATE POLICY "Parents view linked reports" ON reports FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_child_links 
    WHERE parent_user_id = auth.uid() 
    AND student_user_id = reports.user_id 
    AND status = 'approved'
  ));

CREATE POLICY "Admins view all reports" ON reports FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Analytics events policies
CREATE POLICY "Admins view analytics" ON analytics_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "System inserts analytics" ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Project leads policies
CREATE POLICY "Admins view project leads" ON project_leads FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Anyone submit leads" ON project_leads FOR INSERT
  WITH CHECK (true);

-- Subscriptions policies
CREATE POLICY "Users view own subscriptions" ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins view all subscriptions" ON subscriptions FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins manage subscriptions" ON subscriptions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Careers policies
CREATE POLICY "Careers viewable by authenticated" ON careers FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage careers" ON careers FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Learning resources policies
CREATE POLICY "Resources viewable by authenticated" ON learning_resources FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admins manage resources" ON learning_resources FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
