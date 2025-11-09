"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SecurityPage() {
  const { user } = useAuth();
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [emailOtpEnabled, setEmailOtpEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleTOTP = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTotpEnabled(!totpEnabled);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEmailOTP = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailOtpEnabled(!emailOtpEnabled);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-b border-border pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  TOTP Authentication
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app like Google Authenticator or Authy
                </p>
              </div>
              <Switch
                checked={totpEnabled}
                onCheckedChange={handleToggleTOTP}
                disabled={isLoading}
              />
            </div>
            {totpEnabled && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Setup Instructions:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Download an authenticator app</li>
                  <li>Scan the QR code or enter the setup key</li>
                  <li>Enter the 6-digit code to confirm</li>
                </ol>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Email OTP</Label>
                <p className="text-sm text-muted-foreground">
                  Receive one-time passwords via email for verification
                </p>
              </div>
              <Switch
                checked={emailOtpEnabled}
                onCheckedChange={handleToggleEmailOTP}
                disabled={isLoading}
              />
            </div>
            {emailOtpEnabled && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Codes will be sent to {user?.email}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Current Browser</p>
                <p className="text-sm text-muted-foreground">
                  Chrome • macOS • Active now
                </p>
              </div>
              <Badge>Current</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Sign out all other sessions
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
