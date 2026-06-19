-- Add email_verified field to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;

-- Create admin_audit_logs table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "admin_read_audit_logs" ON admin_audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admins can insert audit logs
CREATE POLICY "admin_insert_audit_logs" ON admin_audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_user ON admin_audit_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON admin_audit_logs(target_type, target_id);
