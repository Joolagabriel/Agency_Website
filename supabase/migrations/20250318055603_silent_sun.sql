/*
  # Add email column to dimuser table

  1. Changes
    - Add nullable email column
    - Update existing records with placeholder email
    - Make email column non-null
    - Add unique constraint and index
*/

-- Add email column as nullable first
ALTER TABLE dimuser 
ADD COLUMN email text;

-- Update existing records with a placeholder email based on user_id
-- This ensures we don't have null values before making the column non-null
UPDATE dimuser
SET email = CONCAT('user_', user_id, '@placeholder.com')
WHERE email IS NULL;

-- Now make the column non-null
ALTER TABLE dimuser
ALTER COLUMN email SET NOT NULL;

-- Add unique constraint
ALTER TABLE dimuser
ADD CONSTRAINT dimuser_email_unique UNIQUE (email);

-- Add index for email lookups
CREATE INDEX dimuser_email_idx ON dimuser (email);
