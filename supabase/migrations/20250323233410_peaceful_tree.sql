/*
  # Fix RLS Policies to Prevent Infinite Recursion

  1. Changes
    - Drop existing recursive policies
    - Create new non-recursive policies using auth.jwt()
    - Simplify policy conditions
    - Add role check constraint

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep role-based restrictions
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "educators_read_own" ON dimuser;
DROP POLICY IF EXISTS "employees_read_all" ON dimuser;
DROP POLICY IF EXISTS "employees_update_all" ON dimuser;

-- Create new non-recursive policies
CREATE POLICY "educators_read_own"
ON dimuser
FOR SELECT
TO authenticated
USING ((user_email = (auth.jwt() ->> 'email'::text)) AND (role = 'educator'::text));

CREATE POLICY "employees_read_all"
ON dimuser
FOR SELECT
TO authenticated
USING ((role = 'employee'::text) AND (user_email = (auth.jwt() ->> 'email'::text)));

CREATE POLICY "employees_update_all"
ON dimuser
FOR UPDATE
TO authenticated
USING ((role = 'employee'::text) AND (user_email = (auth.jwt() ->> 'email'::text)));

-- Add constraint to ensure valid roles
ALTER TABLE dimuser DROP CONSTRAINT IF EXISTS dimuser_role_check;
ALTER TABLE dimuser ADD CONSTRAINT dimuser_role_check 
  CHECK (role = ANY (ARRAY['educator'::text, 'employee'::text]));
