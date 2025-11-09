import crypto from "crypto";

/**
 * Hash a password using SHA256
 * In production, use bcrypt or argon2 instead
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Verify a password against a hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  const passwordHash = hashPassword(password);
  return crypto.timingSafeEqual(Buffer.from(passwordHash), Buffer.from(hash));
}

/**
 * Generate a random token
 */
export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Hash a token for storage
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Generate a UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate username format
 */
export function isValidUsername(username: string): boolean {
  // 3-20 chars, alphanumeric, underscore, hyphen
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Check if password meets security requirements
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

/**
 * Get password strength score
 */
export function getPasswordStrength(password: string): {
  score: number;
  level: "weak" | "fair" | "good" | "strong";
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push("At least 8 characters");

  if (password.length >= 12) score++;
  else feedback.push("Longer passwords are more secure");

  if (/[a-z]/.test(password)) score++;
  else feedback.push("Add lowercase letters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("Add uppercase letters");

  if (/\d/.test(password)) score++;
  else feedback.push("Add numbers");

  if (/[@$!%*?&]/.test(password)) score++;
  else feedback.push("Add special characters");

  const level =
    score <= 2 ? "weak" : score <= 3 ? "fair" : score <= 4 ? "good" : "strong";

  return { score, level, feedback };
}

/**
 * Format user data for API response (exclude sensitive fields)
 */
export function formatUserResponse(user: any) {
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

/**
 * Calculate token expiration time
 */
export function calculateExpirationTime(minutes: number): Date {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
}

/**
 * Check if token is expired
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > new Date(expiresAt);
}

/**
 * Generate TOTP secret
 * In production, use a library like speakeasy
 */
export function generateTOTPSecret(): string {
  return crypto.randomBytes(20).toString("base64");
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, "").trim().substring(0, 255);
}

/**
 * Rate limiting helper - check if user exceeded attempts
 */
export function shouldRateLimit(
  attempts: number,
  maxAttempts = 5,
  lockoutMinutes = 15
): { limited: boolean; remainingAttempts: number } {
  return {
    limited: attempts >= maxAttempts,
    remainingAttempts: Math.max(0, maxAttempts - attempts),
  };
}
