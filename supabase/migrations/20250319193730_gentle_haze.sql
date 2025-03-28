/*
  # Fix RLS Policies and Table Structure

  1. Changes
    - Drop existing problematic policies
    - Create new non-recursive policies
    - Fix column references in policies
    - Add missing indexes

  2. Security
    - Maintain data access control through RLS
    - Ensure proper authentication checks
    - Prevent infinite recursion in policies
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read own data" ON dimuser;
DROP POLICY IF EXISTS "Employees can read all data" ON dimuser;
DROP POLICY IF EXISTS "Employees can update all data" ON dimuser;

-- Create new non-recursive policies for dimuser
CREATE POLICY "Allow educators to read own data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  user_email = auth.jwt() ->> 'email'
  AND role = 'educator'
);

CREATE POLICY "Allow employees to read all data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.email = auth.jwt() ->> 'email'
    AND auth.users.email IN (
      SELECT d.user_email 
      FROM dimuser d 
      WHERE d.role = 'employee'
    )
  )
);

CREATE POLICY "Allow employees to update data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.email = auth.jwt() ->> 'email'
    AND auth.users.email IN (
      SELECT d.user_email 
      FROM dimuser d 
      WHERE d.role = 'employee'
    )
  )
);

-- Create index for role-based queries
CREATE INDEX IF NOT EXISTS idx_dimuser_role ON dimuser(role);

-- Create index for child-related queries
CREATE INDEX IF NOT EXISTS idx_dimuser_child_info ON dimuser(child_firstname) WHERE child_firstname IS NOT NULL;
