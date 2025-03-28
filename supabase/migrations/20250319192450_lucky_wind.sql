/*
  # Database Restructure
  
  1. Changes
    - Drop existing tables and their dependencies
    - Create new simplified schema with three main tables
    - Set up RLS policies for data access
    - Establish relationships between tables using user_email

  2. New Tables
    - dimuser: Combined educator and child information
    - incidents: Incident tracking with child references
    - daily_logins: Daily attendance and activity tracking

  3. Security
    - Enable RLS on all tables
    - Create policies for authenticated access
*/

-- Drop existing tables and dependencies
DROP TABLE IF EXISTS dimemployee CASCADE;
DROP TABLE IF EXISTS incidents CASCADE;
DROP TABLE IF EXISTS daily_logins CASCADE;
DROP TABLE IF EXISTS dimchild CASCADE;
DROP TABLE IF EXISTS dimuser CASCADE;

-- Create new dimuser table
CREATE TABLE dimuser (
  user_email text PRIMARY KEY,
  educator_firstname text NOT NULL,
  educator_lastname text NOT NULL,
  educator_dayhome_name text NOT NULL,
  educator_address text NOT NULL,
  educator_city text NOT NULL,
  educator_province text NOT NULL,
  child_firstname text,
  child_lastname text,
  child_dob date,
  child_age integer,
  child_address text,
  child_city text,
  child_province text,
  role text NOT NULL DEFAULT 'educator' CHECK (role IN ('educator', 'employee')),
  created_at timestamptz DEFAULT now()
);

-- Create incidents table
CREATE TABLE incidents (
  incident_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text REFERENCES dimuser(user_email),
  child_firstname text NOT NULL,
  child_lastname text NOT NULL,
  incident_notes text NOT NULL,
  occurrence_datetime timestamptz NOT NULL,
  total_occurrence_hrs numeric(5,2) NOT NULL,
  occurrence_location text NOT NULL,
  "911_Called" boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create daily_logins table
CREATE TABLE daily_logins (
  login_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text REFERENCES dimuser(user_email),
  child_firstname text NOT NULL,
  child_lastname text NOT NULL,
  datetime timestamptz DEFAULT now(),
  starttime timestamptz NOT NULL,
  login_start_notes text,
  endtime timestamptz,
  login_end_notes text,
  total_day_hrs numeric(5,2),
  daily_edu_govt_rate numeric(10,2),
  day_status text DEFAULT 'active' CHECK (day_status IN ('active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dimuser ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logins ENABLE ROW LEVEL SECURITY;

-- Create policies for dimuser
CREATE POLICY "Users can read own data"
ON dimuser
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Employees can read all data"
ON dimuser
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM dimuser 
  WHERE user_email = auth.jwt() ->> 'email' 
  AND role = 'employee'
));

CREATE POLICY "Employees can update all data"
ON dimuser
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM dimuser 
  WHERE user_email = auth.jwt() ->> 'email' 
  AND role = 'employee'
));

-- Create policies for incidents
CREATE POLICY "Users can read own incidents"
ON incidents
FOR SELECT
TO authenticated
USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Employees can read all incidents"
ON incidents
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM dimuser 
  WHERE user_email = auth.jwt() ->> 'email' 
  AND role = 'employee'
));

CREATE POLICY "Users can create incidents"
ON incidents
FOR INSERT
TO authenticated
WITH CHECK (user_email = auth.jwt() ->> 'email');

-- Create policies for daily_logins
CREATE POLICY "Users can read own daily_logins"
ON daily_logins
FOR SELECT
TO authenticated
USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Employees can read all daily_logins"
ON daily_logins
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM dimuser 
  WHERE user_email = auth.jwt() ->> 'email' 
  AND role = 'employee'
));

CREATE POLICY "Users can create daily_logins"
ON daily_logins
FOR INSERT
TO authenticated
WITH CHECK (user_email = auth.jwt() ->> 'email');

-- Create indexes for better query performance
CREATE INDEX idx_dimuser_email ON dimuser(user_email);
CREATE INDEX idx_incidents_user_email ON incidents(user_email);
CREATE INDEX idx_daily_logins_user_email ON daily_logins(user_email);
CREATE INDEX idx_daily_logins_datetime ON daily_logins(datetime);
CREATE INDEX idx_incidents_occurrence_datetime ON incidents(occurrence_datetime);
