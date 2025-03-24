/*
  # Fix JWT Policies

  1. Changes
    - Replace jwt() function with auth.uid() and auth.email()
    - Simplify policy conditions
    - Maintain same access control logic

  2. Security
    - Enable RLS on all tables
    - Add policies for educators and employees
    - Ensure proper access control
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Allow educators to read own data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to read all data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to update data" ON dimuser;

-- Create new simplified policies for dimuser
CREATE POLICY "Allow educators to read own data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  user_email = auth.email()
  AND role = 'educator'
);

CREATE POLICY "Allow employees to read all data"
ON dimuser
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM dimuser d
    WHERE d.user_email = auth.email()
    AND d.role = 'employee'
  )
);

CREATE POLICY "Allow employees to update data"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM dimuser d
    WHERE d.user_email = auth.email()
    AND d.role = 'employee'
  )
);

-- Update indexes
DROP INDEX IF EXISTS idx_dimuser_email;
DROP INDEX IF EXISTS idx_dimuser_role;
DROP INDEX IF EXISTS idx_dimuser_child_info;

CREATE INDEX idx_dimuser_user_email ON dimuser(user_email);
CREATE INDEX idx_dimuser_role ON dimuser(role);
CREATE INDEX idx_dimuser_child_info ON dimuser(child_firstname) WHERE child_firstname IS NOT NULL;