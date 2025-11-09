"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  onComplete?: (value: string) => void;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  onComplete,
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const otpArray = value.split("").slice(0, length);
    setOtp([...otpArray, ...Array(length - otpArray.length).fill("")]);
  }, [value, length]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    onChange(otpValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
      onChange(newOtp.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, length);

    if (digits.length > 0) {
      const newOtp = digits.split("").slice(0, length);
      while (newOtp.length < length) {
        newOtp.push("");
      }
      setOtp(newOtp);
      onChange(newOtp.join(""));

      if (digits.length === length) {
        onComplete?.(digits);
      }

      inputRefs.current[Math.min(digits.length, length - 1)]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="h-12 w-12 text-center text-lg font-semibold"
          placeholder="-"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
