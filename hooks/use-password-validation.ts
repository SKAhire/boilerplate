"use client";

import { useState, useCallback } from "react";
import {
  calculatePasswordStrength,
  getPasswordRequirements,
} from "@/lib/password-utils";

export function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = calculatePasswordStrength(password);
  const requirements = getPasswordRequirements(password);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return {
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    strength,
    requirements,
  };
}
