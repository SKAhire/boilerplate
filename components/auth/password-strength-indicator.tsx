"use client";

import { CheckCircle2, Circle } from "lucide-react";
import {
  calculatePasswordStrength,
  getPasswordRequirements,
} from "@/lib/password-utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);
  const requirements = getPasswordRequirements(password);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-muted p-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <div className="text-xs font-medium text-foreground/70">
            Password Strength
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < strength.score ? strength.color : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs font-semibold text-foreground">
          {strength.label}
        </span>
      </div>

      <div className="space-y-1">
        <RequirementRow
          met={requirements.length}
          label="At least 8 characters"
        />
        <RequirementRow
          met={requirements.uppercase}
          label="One uppercase letter"
        />
        <RequirementRow
          met={requirements.lowercase}
          label="One lowercase letter"
        />
        <RequirementRow met={requirements.number} label="One number" />
        <RequirementRow
          met={requirements.special}
          label="One special character"
        />
      </div>
    </div>
  );
}

function RequirementRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Circle className="h-3.5 w-3.5 text-muted-foreground" />
      )}
      <span className={met ? "text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}
