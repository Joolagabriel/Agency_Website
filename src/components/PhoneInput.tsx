import React from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required, className }) => {
  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 10) {
      onChange(formatted);
    }
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      required={required}
      className={className}
      placeholder="(XXX) XXX-XXXX"
      pattern="\(\d{3}\) \d{3}-\d{4}"
    />
  );
};