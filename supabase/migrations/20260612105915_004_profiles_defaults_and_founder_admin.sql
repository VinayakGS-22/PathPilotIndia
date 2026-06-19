-- Ensure approval_status defaults to 'approved' for new users
ALTER TABLE profiles
  ALTER COLUMN approval_status SET DEFAULT 'approved';

-- Ensure email_verified column exists and defaults to false
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;

-- Ensure onboarding_completed defaults to false
ALTER TABLE profiles
  ALTER COLUMN onboarding_completed SET DEFAULT false;

-- Ensure role defaults to 'student'
ALTER TABLE profiles
  ALTER COLUMN role SET DEFAULT 'student';

-- Auto-set founder as admin (idempotent upsert on email)
-- Only runs if the user already exists in profiles; safe to re-run
UPDATE profiles
SET role = 'admin', approval_status = 'approved'
WHERE email = 'gsvinayak8@gmail.com';
