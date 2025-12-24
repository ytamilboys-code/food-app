
import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
  color: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange, color }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...value];
    // Take only the last character entered
    newOtp[index] = val.substring(val.length - 1);
    onChange(newOtp);

    // Move to next input if value is entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...value];
    pastedData.forEach((char, i) => {
      if (!isNaN(Number(char))) {
        newOtp[i] = char;
      }
    });
    onChange(newOtp);
    // Focus the next empty or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-between gap-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          // Fix: Wrap the ref assignment in curly braces so it returns void. 
          // Implicit return of the assignment result caused a TypeScript error as React expects void.
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-12 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent focus:border-${color}-500 focus:bg-white rounded-2xl outline-none transition-all shadow-sm focus:shadow-md`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
