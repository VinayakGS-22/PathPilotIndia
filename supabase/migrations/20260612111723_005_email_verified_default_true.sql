ALTER TABLE profiles ALTER COLUMN email_verified SET DEFAULT true;
UPDATE profiles SET email_verified = true WHERE email_verified = false;