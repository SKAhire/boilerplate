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
import { Checkbox } from "@/components/ui/checkbox";
import type { LoginFormData } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "./password-input";
import { OAuthButton } from "./oauth-button";

export function LoginForm() {
  const router = useRouter();
  const { setUser, setError, setIsLoading, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
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
      const identifier = formData.email.trim();
      const looksLikeEmail = identifier.includes("@");

      const payload: any = {
        password: formData.password,
        remember: rememberMe,
      };

      if (looksLikeEmail) {
        payload.email = identifier;
      } else {
        payload.email = identifier;
      }

      const { data, error } = await authClient.signIn.email(payload);

      if (error) {
        if ((error as any)?.data?.errors) {
          setErrors((prev) => ({ ...prev, ...(error as any).data.errors }));
        } else {
          const message = (error as any)?.message ?? "Failed to sign in";
          setError(message);
        }
        return;
      }

      if (data?.user) {
        setUser(data.user);
        router.push("/dashboard");
        return;
      }

      if ((data as any)?.url) {
        window.location.href = (data as any).url;
        return;
      }

      if ((data as any)?.message) {
        setGlobalMessage(String((data as any).message));
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setGlobalMessage(null);

    try {
      const data = await (authClient as any).signIn.social({
        provider: "google",
      });

      const redirect = (data as any)?.url ?? (data as any)?.redirectUrl;
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      if ((data as any)?.user) {
        setUser((data as any).user);
        router.push("/dashboard");
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
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (globalMessage) setGlobalMessage(null);
  };

  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
    if (globalMessage) setGlobalMessage(null);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <OAuthButton
            provider="google"
            onClick={handleGoogleLogin}
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe or john@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <PasswordInput
                id="password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                required
                error={errors.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember"
                  className="font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/auth/signup"
            className="text-primary hover:underline font-medium"
          >
            Create one
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
