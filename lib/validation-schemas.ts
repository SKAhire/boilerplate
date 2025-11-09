/**
 * Validation schemas for form data
 */

export const signupValidationSchema = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    message:
      "Username can only contain letters, numbers, underscores, and hyphens",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "Password must contain uppercase, lowercase, and numbers",
  },
  full_name: {
    minLength: 2,
    maxLength: 255,
    message: "Please enter a valid full name",
  },
};

export const loginValidationSchema = {
  username: {
    required: true,
    message: "Username or email is required",
  },
  password: {
    required: true,
    message: "Password is required",
  },
};

export const profileValidationSchema = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    message:
      "Username can only contain letters, numbers, underscores, and hyphens",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  full_name: {
    minLength: 2,
    maxLength: 255,
    message: "Please enter a valid full name",
  },
};

export const passwordValidationSchema = {
  current_password: {
    required: true,
    message: "Current password is required",
  },
  new_password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "Password must contain uppercase, lowercase, and numbers",
  },
};

export type ValidationRule = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  required?: boolean;
  message: string;
};

/**
 * Validate field against schema
 */
export function validateField(
  value: string,
  rule: ValidationRule
): { valid: boolean; error?: string } {
  if (rule.required && !value) {
    return { valid: false, error: rule.message };
  }

  if (rule.minLength && value.length < rule.minLength) {
    return {
      valid: false,
      error: `Must be at least ${rule.minLength} characters`,
    };
  }

  if (rule.maxLength && value.length > rule.maxLength) {
    return {
      valid: false,
      error: `Must be no more than ${rule.maxLength} characters`,
    };
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return { valid: false, error: rule.message };
  }

  return { valid: true };
}
