"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ChangePasswordSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password cannot be the same as current password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsOpen(false);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Manage your password security</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsOpen(true)}>Change Password</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <PasswordInput
          value={currentPassword}
          onChange={setCurrentPassword}
          label="Current Password"
          id="current-password"
          placeholder="Enter your current password"
          disabled={isLoading}
          required
        />

        <PasswordInput
          value={newPassword}
          onChange={setNewPassword}
          label="New Password"
          id="new-password"
          placeholder="Create a new password"
          disabled={isLoading}
          required
        />

        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm New Password"
          id="confirm-new-password"
          placeholder="Confirm your new password"
          disabled={isLoading}
          required
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              setError("");
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleChangePassword} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
