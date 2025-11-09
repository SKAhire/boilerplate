import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign Up - SecureAuth",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground">
          Join SecureAuth and manage your profile securely
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
