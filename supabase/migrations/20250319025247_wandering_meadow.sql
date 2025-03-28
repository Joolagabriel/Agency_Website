/*
  # Create dimemployee table

  1. New Tables
    - `dimemployee`
      - `employee_id` (uuid, primary key)
      - `emp_code` (text, unique 4-digit code)
      - `firstname` (text)
      - `lastname` (text)
      - `email` (text, unique, foreign key to dimuser)
      - `phone` (text)
      - `position` (text)
      - `hire_date` (date)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `dimemployee` table
    - Add policy for employees to read all employee data
    - Add policy for employees to update their own data
*/

-- Create the dimemployee table
CREATE TABLE IF NOT EXISTS dimemployee (
  employee_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emp_code text UNIQUE NOT NULL CHECK (emp_code ~ '^[0-9]{4}$'),
  firstname text NOT NULL,
  lastname text NOT NULL,
  email text UNIQUE NOT NULL REFERENCES dimuser(email),
  phone text,
  position text NOT NULL,
  hire_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dimemployee ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Employees can read all employee data"
  ON dimemployee
  FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM dimuser WHERE email = auth.jwt() ->> 'email') = 'employee'
  );

CREATE POLICY "Employees can update their own data"
  ON dimemployee
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS dimemployee_email_idx ON dimemployee(email);
CREATE INDEX IF NOT EXISTS dimemployee_emp_code_idx ON dimemployee(emp_code);
