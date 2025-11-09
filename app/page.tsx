import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to SecureAuth
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive authentication and profile management system built
            with Next.js, shadcn/ui, and Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="space-y-2 p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Secure Signup</h3>
            <p className="text-sm text-muted-foreground">
              Create accounts with password strength validation and real-time
              feedback
            </p>
          </div>
          <div className="space-y-2 p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">2FA Support</h3>
            <p className="text-sm text-muted-foreground">
              Enable TOTP and Email OTP for enhanced account security
            </p>
          </div>
          <div className="space-y-2 p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">
              Profile Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage passwords, avatar uploads, and security settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
