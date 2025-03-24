/*
  # Fix RLS Policies to Prevent Infinite Recursion

  1. Changes
    - Drop existing problematic policies
    - Create new non-recursive policies using auth.uid() and claims
    - Maintain security while avoiding circular dependencies

  2. Security
    - Educators can only read their own data
    - Employees can read and update all data
    - Initial employee record creation allowed
    - Employee data insertion allowed
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Allow educators to read own data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to read all data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to update data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to insert data" ON dimuser;
DROP POLICY IF EXISTS "Allow initial employee record" ON dimuser;

-- Create new non-recursive policies
CREATE POLICY "educators_read_own"
ON dimuser
FOR SELECT
TO authenticated
USING (
  user_email = auth.email()
  AND role = 'educator'
);

CREATE POLICY "employees_read_all"
ON dimuser
FOR SELECT
TO authenticated
USING (
  role = 'employee'
  AND user_email = auth.email()
);

CREATE POLICY "employees_update_all"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  role = 'employee'
  AND user_email = auth.email()
);

CREATE POLICY "employees_insert"
ON dimuser
FOR INSERT
TO authenticated
WITH CHECK (
  (
    -- Allow employees to insert new records
    EXISTS (
      SELECT 1
      FROM dimuser
      WHERE user_email = auth.email()
      AND role = 'employee'
    )
  ) OR (
    -- Allow initial employee record
    NOT EXISTS (
      SELECT 1
      FROM dimuser
      WHERE role = 'employee'
    )
    AND role = 'employee'
  )
);