import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Forgot Password - SecureAuth",
  description: "Reset your password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
        <p className="text-muted-foreground">
          Enter your email to receive a password reset link
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
