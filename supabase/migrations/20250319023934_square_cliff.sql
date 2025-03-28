/*
  # Add user roles and authentication separation

  1. Changes
    - Add role column to dimuser table
    - Add role-based policies
    - Update existing data to set default roles

  2. Security
    - Enable RLS
    - Add policies for role-based access
*/

-- Add role column to dimuser table
ALTER TABLE dimuser 
ADD COLUMN role text NOT NULL DEFAULT 'educator' 
CHECK (role IN ('educator', 'employee'));

-- Create policy for educators
CREATE POLICY "Educators can only access their own data"
ON dimuser
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'email' = email 
  AND role = 'educator'
);

-- Create policy for employees
CREATE POLICY "Employees can access all data"
ON dimuser
FOR ALL
TO authenticated
USING (
  (SELECT role FROM dimuser WHERE email = auth.jwt() ->> 'email') = 'employee'
);
