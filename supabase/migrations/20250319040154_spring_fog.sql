/*
  # Fix User Policies

  1. Changes
    - Drop existing recursive policies
    - Create new policies with proper authorization checks
    - Use auth.jwt() for initial role verification
    - Implement separate policies for different operations
    
  2. Security
    - Maintains proper access control
    - Prevents infinite recursion
    - Preserves data isolation between users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to read own data" ON dimuser;
DROP POLICY IF EXISTS "Allow educators to update own data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to read all data" ON dimuser;
DROP POLICY IF EXISTS "Allow employees to update all data" ON dimuser;

-- Create new non-recursive policies
CREATE POLICY "Users can read own data"
ON dimuser
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = email);

CREATE POLICY "Allow employees to read all data"
ON dimuser
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'employee'::text);

CREATE POLICY "Allow educators to update own data"
ON dimuser
FOR UPDATE
TO authenticated
USING (((auth.jwt() ->> 'email'::text) = email) AND ((auth.jwt() ->> 'role'::text) = 'educator'::text))
WITH CHECK ((email = (auth.jwt() ->> 'email'::text)) AND (role = 'educator'::text));

CREATE POLICY "Allow employees to update all data"
ON dimuser
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'employee'::text);