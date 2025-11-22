"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OTPForm() {
  const router = useRouter();
  const { setUser, setError, setIsLoading, isLoading } = useAuth();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const validateForm = () => {
    if (!otp.trim()) {
      setErrors("OTP is required");
      return false;
    }
    if (otp.length !== 6) {
      setErrors("OTP must be 6 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: "john@example.com",
        full_name: "John Doe",
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(60);
    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 500));
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Verify your identity</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email or authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setErrors(null);
              }}
              placeholder="000000"
              disabled={isLoading}
              maxLength={6}
              inputMode="numeric"
              className="text-center text-2xl tracking-widest"
            />
            {errors && <p className="text-sm text-destructive">{errors}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleResend}
            disabled={resendTimer > 0 || isLoading}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
