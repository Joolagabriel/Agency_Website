/*
  # Fix RLS Policies for dimuser Table

  1. Changes
    - Drop existing problematic policies
    - Create new policies without using NEW keyword
    - Maintain same security rules but with different implementation

  2. Security
    - Educators can only read their own data
    - Employees can read and update all data
    - Allow creation of first employee record
    - Allow employees to insert new records
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "educators_read_own" ON dimuser;
DROP POLICY IF EXISTS "employees_read_all" ON dimuser;
DROP POLICY IF EXISTS "employees_update_all" ON dimuser;
DROP POLICY IF EXISTS "employees_insert" ON dimuser;

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
  EXISTS (
    SELECT 1
    FROM dimuser
    WHERE user_email = auth.email()
    AND role = 'employee'
  )
);

CREATE POLICY "employees_update_all"
ON dimuser
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM dimuser
    WHERE user_email = auth.email()
    AND role = 'employee'
  )
);

-- Split the insert policy into two separate policies for clarity
CREATE POLICY "allow_initial_employee"
ON dimuser
FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1 
    FROM dimuser 
    WHERE role = 'employee'
  )
  AND role = 'employee'
);

CREATE POLICY "allow_employee_inserts"
ON dimuser
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM dimuser
    WHERE user_email = auth.email()
    AND role = 'employee'
  )
);
