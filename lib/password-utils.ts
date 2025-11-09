// Password strength calculation and validation utilities
export function calculatePasswordStrength(password: string): {
  score: number;
  label: "Weak" | "Fair" | "Good" | "Strong";
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  const labels: Array<"Weak" | "Fair" | "Good" | "Strong"> = [
    "Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Strong",
  ];
  const colors = [
    "bg-destructive",
    "bg-destructive",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-green-500",
  ];

  return {
    score: Math.min(score, 5),
    label: labels[score] || "Weak",
    color: colors[score] || "bg-destructive",
  };
}

export function getPasswordRequirements(password: string) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };
}
