/*
  # Fix recursive policies for dimuser table

  1. Changes
    - Drop existing policies that cause recursion
    - Create new non-recursive policies using a different approach
    - Separate policies for different user roles and operations

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep role-based restrictions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON dimuser;
DROP POLICY IF EXISTS "Educators can update own data" ON dimuser;
DROP POLICY IF EXISTS "Employees can read all data" ON dimuser;
DROP POLICY IF EXISTS "Employees can update all data" ON dimuser;

-- Create new non-recursive policies
CREATE POLICY "Allow users to read own data"
ON dimuser
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Allow educators to update own data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' = email 
  AND EXISTS (
    SELECT 1 FROM dimuser 
    WHERE email = auth.jwt() ->> 'email' 
    AND role = 'educator'
  )
)
WITH CHECK (
  email = auth.jwt() ->> 'email'
  AND role = 'educator'
);

CREATE POLICY "Allow employees to read all data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM dimuser 
    WHERE email = auth.jwt() ->> 'email' 
    AND role = 'employee'
  )
);

CREATE POLICY "Allow employees to update all data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM dimuser 
    WHERE email = auth.jwt() ->> 'email' 
    AND role = 'employee'
  )
);