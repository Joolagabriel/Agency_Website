/*
  # Sync email from auth table with default values

  1. Changes
    - Create a trigger function to sync email and provide default values for required fields
    - Add trigger to automatically create dimuser records when new users authenticate
    - Sync existing auth users with default values
  
  2. Notes
    - Ensures all required fields have default values when creating new users
    - Maintains data integrity through automatic synchronization
*/

-- Create function to sync email from auth.users with default values
CREATE OR REPLACE FUNCTION sync_user_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into dimuser with default values for required fields
  INSERT INTO public.dimuser (
    email,
    firstname,
    lastname,
    dayhomename,
    address,
    city,
    province,
    country
  )
  VALUES (
    NEW.email,
    'New',  -- Default firstname
    'User', -- Default lastname
    'My Day Home', -- Default dayhomename
    'TBD', -- Default address
    'Calgary', -- Default city
    'Alberta', -- Default province
    'Canada'  -- Default country
  )
  ON CONFLICT (email) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_email();

-- Sync existing users with default values
INSERT INTO public.dimuser (
  email,
  firstname,
  lastname,
  dayhomename,
  address,
  city,
  province,
  country
)
SELECT 
  email,
  'New',  -- Default firstname
  'User', -- Default lastname
  'My Day Home', -- Default dayhomename
  'TBD', -- Default address
  'Calgary', -- Default city
  'Alberta', -- Default province
  'Canada'  -- Default country
FROM auth.users
ON CONFLICT (email) DO NOTHING;