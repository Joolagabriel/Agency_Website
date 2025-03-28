/*
  # Add Insert Policy for Dimuser Table

  1. Changes
    - Add policy to allow employees to insert new records
    - Maintain existing policies for read and update
    - Use auth.email() for consistent authentication

  2. Security
    - Only employees can create new educator records
    - Maintains existing access control
*/

-- Create policy to allow employees to insert records
CREATE POLICY "Allow employees to insert data"
ON dimuser
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM dimuser d
    WHERE d.user_email = auth.email()
    AND d.role = 'employee'
  )
);

-- Add policy to allow inserting initial employee record
CREATE POLICY "Allow initial employee record"
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
