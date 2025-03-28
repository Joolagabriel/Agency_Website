/*
  # Update dimuser primary key to email

  1. Changes
    - Remove user_id column from dimuser table
    - Make email column the primary key
    - Update foreign key references in other tables
  
  2. Notes
    - Preserves data integrity
    - Updates all related foreign key constraints
    - Maintains existing RLS policies
*/

-- First drop existing policies that depend on user_id
DROP POLICY IF EXISTS "Users can read own children" ON dimchild;
DROP POLICY IF EXISTS "Users can read own incidents" ON incidents;
DROP POLICY IF EXISTS "Users can create incidents" ON incidents;
DROP POLICY IF EXISTS "Users can read own daily logins" ON daily_logins;
DROP POLICY IF EXISTS "Users can create daily logins" ON daily_logins;
DROP POLICY IF EXISTS "Users can update own daily logins" ON daily_logins;
DROP POLICY IF EXISTS "Users can read own data" ON dimuser;

-- Add temporary columns for email references
ALTER TABLE dimchild
ADD COLUMN temp_user_email text REFERENCES dimuser(email);

UPDATE dimchild
SET temp_user_email = (
  SELECT email 
  FROM dimuser 
  WHERE dimuser.user_id = dimchild.user_id
);

ALTER TABLE incidents
ADD COLUMN temp_user_email text REFERENCES dimuser(email);

UPDATE incidents
SET temp_user_email = (
  SELECT email 
  FROM dimuser 
  WHERE dimuser.user_id = incidents.user_id
);

ALTER TABLE daily_logins
ADD COLUMN temp_user_email text REFERENCES dimuser(email);

UPDATE daily_logins
SET temp_user_email = (
  SELECT email 
  FROM dimuser 
  WHERE dimuser.user_id = daily_logins.user_id
);

-- Drop existing foreign key constraints
ALTER TABLE dimchild
DROP CONSTRAINT IF EXISTS dimchild_user_id_fkey;

ALTER TABLE incidents
DROP CONSTRAINT IF EXISTS incidents_user_id_fkey;

ALTER TABLE daily_logins
DROP CONSTRAINT IF EXISTS daily_logins_user_id_fkey;

-- Drop the user_id column from child tables
ALTER TABLE dimchild
DROP COLUMN user_id;

ALTER TABLE incidents
DROP COLUMN user_id;

ALTER TABLE daily_logins
DROP COLUMN user_id;

-- Rename temp columns to user_email
ALTER TABLE dimchild
RENAME COLUMN temp_user_email TO user_email;

ALTER TABLE incidents
RENAME COLUMN temp_user_email TO user_email;

ALTER TABLE daily_logins
RENAME COLUMN temp_user_email TO user_email;

-- Make the temp columns NOT NULL
ALTER TABLE dimchild
ALTER COLUMN user_email SET NOT NULL;

ALTER TABLE incidents
ALTER COLUMN user_email SET NOT NULL;

ALTER TABLE daily_logins
ALTER COLUMN user_email SET NOT NULL;

-- Drop the primary key constraint and user_id column from dimuser
ALTER TABLE dimuser
DROP CONSTRAINT dimuser_pkey CASCADE;

ALTER TABLE dimuser
DROP COLUMN user_id;

-- Make email the primary key
ALTER TABLE dimuser
ADD PRIMARY KEY (email);

-- Recreate RLS policies using email
CREATE POLICY "Users can read own data"
  ON dimuser
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = email);

CREATE POLICY "Users can read own children"
  ON dimchild
  FOR SELECT
  TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can read own incidents"
  ON incidents
  FOR SELECT
  TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can create incidents"
  ON incidents
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can read own daily logins"
  ON daily_logins
  FOR SELECT
  TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can create daily logins"
  ON daily_logins
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can update own daily logins"
  ON daily_logins
  FOR UPDATE
  TO authenticated
  USING (user_email = auth.jwt()->>'email')
  WITH CHECK (user_email = auth.jwt()->>'email');
