"use client";

import type React from "react";
import { useState, useMemo } from "react";
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
import type { SignupFormData } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import { PasswordInput } from "./password-input";
import { OAuthButton } from "./oauth-button";

export function SignupForm() {
  const router = useRouter();
  const { setUser, setError, setIsLoading, isLoading } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setGlobalMessage(null);
    setErrors({});

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.full_name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: undefined,
      });

      if (error) {
        if ((error as any)?.data?.errors) {
          setErrors((prev) => ({ ...prev, ...(error as any).data.errors }));
        } else {
          setError((error as any)?.message ?? "Failed to create account");
        }
        return;
      }

      if (data?.user) {
        setUser(data.user);
        router.push("/dashboard");
        return;
      }

      if (data?.message) {
        setGlobalMessage(String(data.message));
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authClient.signIn.social({ provider: "google" });
      const redirect = (data as any)?.url ?? (data as any)?.redirectUrl;
      if (redirect) {
        window.location.href = redirect;
        return;
      }
      if ((data as any)?.error) {
        setError(
          (data as any).error?.message ?? "Failed to sign in with Google"
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (globalMessage) setGlobalMessage(null);
  };

  // These two handlers are for the PasswordInput component which exposes onChange(value: string)
  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
    if (
      errors.confirm_password &&
      prevConfirmMatches(value, formData.confirm_password)
    ) {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }
    if (globalMessage) setGlobalMessage(null);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, confirm_password: value }));
    if (
      errors.confirm_password &&
      prevConfirmMatches(formData.password, value)
    ) {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }
    if (globalMessage) setGlobalMessage(null);
  };

  // helper to check match safely
  const prevConfirmMatches = (pwd: string, confirm: string) => pwd === confirm;

  // Compute live match status to show message below confirm input.
  const passwordsMatch = useMemo(
    () =>
      formData.confirm_password.length > 0 &&
      formData.password === formData.confirm_password,
    [formData.password, formData.confirm_password]
  );

  const passwordsMismatch = useMemo(
    () =>
      formData.confirm_password.length > 0 &&
      formData.password !== formData.confirm_password,
    [formData.password, formData.confirm_password]
  );

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <OAuthButton
            provider="google"
            onClick={handleGoogleSignup}
            isLoading={isLoading}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {globalMessage && (
            <p className="text-sm text-center text-muted-foreground">
              {globalMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={isLoading}
              />
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <PasswordInput
                id="password"
                label="Password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                required
                error={errors.password}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}

              {/* show strength indicator when user has typed something */}
              {formData.password.length > 0 && (
                <div className="mt-2">
                  <PasswordStrengthIndicator password={formData.password} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <PasswordInput
                id="confirm_password"
                label="Confirm Password"
                value={formData.confirm_password}
                onChange={handleConfirmPasswordChange}
                placeholder="••••••••"
                required
                error={errors.confirm_password}
              />
              {errors.confirm_password && (
                <p className="text-sm text-destructive">
                  {errors.confirm_password}
                </p>
              )}

              {/* Live match/mismatch message */}
              {passwordsMatch && (
                <p className="text-sm text-green-600">Passwords match</p>
              )}
              {passwordsMismatch && (
                <p className="text-sm text-destructive">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
