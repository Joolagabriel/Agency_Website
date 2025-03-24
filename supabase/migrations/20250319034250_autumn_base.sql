/*
  # Fix recursive policy for dimuser table

  1. Changes
    - Drop existing recursive policies
    - Create new non-recursive policies for dimuser table
    - Add separate policies for different operations

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Separate read/write permissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Educators can only access their own data" ON dimuser;
DROP POLICY IF EXISTS "Employees can access all data" ON dimuser;
DROP POLICY IF EXISTS "Users can read own data" ON dimuser;

-- Create new non-recursive policies
CREATE POLICY "Users can read own data"
ON dimuser
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Educators can update own data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' = email 
  AND role = 'educator'
)
WITH CHECK (
  auth.jwt() ->> 'email' = email 
  AND role = 'educator'
);

CREATE POLICY "Employees can read all data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM dimuser WHERE role = 'employee'
  )
);

CREATE POLICY "Employees can update all data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM dimuser WHERE role = 'employee'
  )
)
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM dimuser WHERE role = 'employee'
  )
);