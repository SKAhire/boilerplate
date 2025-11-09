import { OTPForm } from "@/components/auth/otp-form"

export const metadata = {
  title: "Verify OTP - SecureAuth",
  description: "Verify your identity with one-time password",
}

export default function OTPPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Verify Identity</h1>
        <p className="text-muted-foreground">Enter the code sent to your email or authenticator app</p>
      </div>
      <OTPForm />
    </div>
  )
}
