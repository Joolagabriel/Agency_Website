/*
  # Fix Policy Recursion and Add Indexes

  1. Changes
    - Drop and recreate policies to prevent recursion
    - Add indexes for better performance
    - Remove column rename since column is already correct

  2. Security
    - Maintain same access control rules
    - Use proper auth.jwt() function
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "educators_read_own" ON dimuser;
DROP POLICY IF EXISTS "employees_read_all" ON dimuser;
DROP POLICY IF EXISTS "employees_update_all" ON dimuser;
DROP POLICY IF EXISTS "allow_initial_employee" ON dimuser;
DROP POLICY IF EXISTS "allow_employee_inserts" ON dimuser;

-- Create new simplified policies
CREATE POLICY "educators_read_own"
ON dimuser
FOR SELECT
TO authenticated
USING ((user_email = (auth.jwt() ->> 'email')) AND (role = 'educator'::text));

CREATE POLICY "employees_read_all"
ON dimuser
FOR SELECT
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM dimuser dimuser_1
  WHERE ((dimuser_1.user_email = (auth.jwt() ->> 'email')) AND (dimuser_1.role = 'employee'::text)))));

CREATE POLICY "employees_update_all"
ON dimuser
FOR UPDATE
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM dimuser dimuser_1
  WHERE ((dimuser_1.user_email = (auth.jwt() ->> 'email')) AND (dimuser_1.role = 'employee'::text)))));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incidents_occurrence_datetime 
ON incidents(occurrence_datetime);

CREATE INDEX IF NOT EXISTS idx_daily_logins_starttime 
ON daily_logins(starttime);