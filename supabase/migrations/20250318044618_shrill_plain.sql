/*
  # Initial Database Schema Setup

  1. New Tables
    - dimuser: Stores user information
    - dimchild: Stores child information
    - incidents: Records incident reports
    - daily_logins: Tracks daily attendance and care hours

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create dimuser table
CREATE TABLE IF NOT EXISTS dimuser (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firstname text NOT NULL,
  lastname text NOT NULL,
  dayhomename text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create dimchild table
CREATE TABLE IF NOT EXISTS dimchild (
  child_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES dimuser(user_id),
  firstname text NOT NULL,
  lastname text NOT NULL,
  dob date NOT NULL,
  age integer NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  inci_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES dimuser(user_id),
  child_id uuid REFERENCES dimchild(child_id),
  incidentNotes text NOT NULL,
  occurrenceDateTime timestamptz NOT NULL,
  totalOccurrenceHrs decimal(5,2) NOT NULL,
  occurrenceLocation text NOT NULL,
  "911Called" boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create daily_logins table
CREATE TABLE IF NOT EXISTS daily_logins (
  log_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES dimuser(user_id),
  child_id uuid REFERENCES dimchild(child_id),
  datetime timestamptz DEFAULT now(),
  starttime timestamptz NOT NULL,
  loginstartnotes text,
  endtime timestamptz,
  loginendnotes text,
  totaldayhrs decimal(5,2),
  dailyedugovtrate decimal(10,2),
  daystatus text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dimuser ENABLE ROW LEVEL SECURITY;
ALTER TABLE dimchild ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON dimuser
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own children"
  ON dimchild
  FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT user_id FROM dimuser WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can read own incidents"
  ON incidents
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create incidents"
  ON incidents
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own daily logins"
  ON daily_logins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create daily logins"
  ON daily_logins
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own daily logins"
  ON daily_logins
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
