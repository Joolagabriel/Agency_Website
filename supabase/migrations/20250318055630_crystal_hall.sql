/*
  # Add child age calculation

  1. Changes
    - Create function to calculate child's age from DOB
    - Add trigger to automatically update age when DOB changes
    - Add trigger to update age on insert
  
  2. Notes
    - Uses PostgreSQL's built-in AGE function
    - Automatically maintains age field based on DOB
    - No external extensions required
*/

-- Create function to calculate age
CREATE OR REPLACE FUNCTION calculate_child_age()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate age in years
  NEW.age := DATE_PART('year', AGE(CURRENT_DATE, NEW.dob))::integer;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update age on insert or update of dob
CREATE TRIGGER update_child_age
  BEFORE INSERT OR UPDATE OF dob
  ON dimchild
  FOR EACH ROW
  EXECUTE FUNCTION calculate_child_age();

-- Update existing records
UPDATE dimchild
SET age = DATE_PART('year', AGE(CURRENT_DATE, dob))::integer;