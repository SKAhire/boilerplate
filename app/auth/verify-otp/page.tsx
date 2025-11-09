"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OtpInput } from "@/components/auth/otp-input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOtpTimer } from "@/hooks/use-otp-timer"

export default function OtpVerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [method, setMethod] = useState<"email" | "totp">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { timeLeft, isExpired, formatTime, reset } = useOtpTimer(300)

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/recovery/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp_code: otp,
          method,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || "OTP verification failed")
        return
      }

      router.push("/auth/reset-password")
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    reset()
    try {
      await fetch("/api/recovery/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method }),
      })
    } catch {
      setError("Failed to resend OTP")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Verify OTP</h2>
        <p className="text-muted-foreground">
          Enter the code we sent to your {method === "email" ? "email" : "authenticator app"}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <p className="text-sm text-muted-foreground text-center">Verification Method</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={method === "email" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMethod("email")}
            disabled={isLoading}
          >
            Email OTP
          </Button>
          <Button
            type="button"
            variant={method === "totp" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMethod("totp")}
            disabled={isLoading}
          >
            Authenticator
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <OtpInput value={otp} onChange={setOtp} onComplete={handleVerifyOtp} />

        <Button
          onClick={handleVerifyOtp}
          className="w-full"
          size="lg"
          disabled={isLoading || otp.length !== 6 || isExpired}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </div>

      <div className="text-center space-y-2">
        {isExpired ? (
          <Button type="button" variant="link" onClick={handleResendOtp} className="w-full">
            Resend Code
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">Code expires in {formatTime()}</p>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        <a href="/auth/login" className="font-medium text-primary hover:underline">
          Back to login
        </a>
      </p>
    </div>
  )
}
