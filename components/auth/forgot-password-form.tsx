"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
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
import { authClient } from "@/lib/auth-client";


export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInfo(null);

    try {
      // Use Better Auth client to request a password reset email.
      // redirectTo should point to your reset page where you'll call authClient.resetPassword with the token.
      const redirectTo = `${location.origin}/auth/reset-password`;
      const { data, error: clientError } = await (
        authClient as any
      ).requestPasswordReset({
        email: email.trim(),
        redirectTo,
      });

      // Library intentionally may not reveal whether the email exists — treat success the same.
      if (clientError) {
        // don't reveal existence; show a neutral message for most cases
        // but surface server messages when useful
        const msg =
          (clientError as any)?.message ?? "Failed to send reset email";
        setError(msg);
        return;
      }

      // On success show neutral "check your email" flow
      setSubmitted(true);

      // Optionally surface any informational messages returned by server (non-sensitive)
      if ((data as any)?.message) {
        setInfo(String((data as any).message));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent a password reset link to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <p className="text-sm text-muted-foreground">
            If you don't see the email within a few minutes, check your spam
            folder.
          </p>
          <div className="flex gap-2 flex-col">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
                setError(null);
                setInfo(null);
              }}
            >
              Try another email
            </Button>
            <Button asChild className="w-full">
              <Link href="/auth/login">Back to login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter the email address associated with your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
                setInfo(null);
              }}
              placeholder="john@example.com"
              disabled={isLoading}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            Remember your password?{" "}
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
