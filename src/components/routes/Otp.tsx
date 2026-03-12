import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { apiService } from "@/service/apiService"
import useAuthStore from "@/store/store"
import { useLocation, useNavigate } from "react-router-dom"

export function InputOTPForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { email, type } = location.state || {}

  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [timer, setTimer] = useState(300)
  const [isResendEnabled, setIsResendEnabled] = useState(false)

  useEffect(() => {
    if (timer <= 0) {
      setIsResendEnabled(true)
      return
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  async function handleResend() {
    setIsResendEnabled(false)
    setTimer(300)
    setError("")
    setMessage("")

    let result
    if (type === "reset-password") {
      result = await apiService.resendForgetPasswordOtp(email)
    } else {
      result = await apiService.resendSignupOtp(email)
    }

    if (result.error) {
      setError(result.error)
      setIsResendEnabled(true)
      setTimer(0)
    } else {
      setSuccess(true)
      setMessage("Verification code resent successfully")
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  async function handleVerifyOtp() {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code")
      return
    }

    setLoading(true)
    setError("")

    let result;
    if (type === "reset-password") {
        result = await apiService.verfifyForgetPasswordOtp(email, otp)
    } else {
        result = await apiService.verifyOtp(email, otp)
    }

    if (result.error) {
      setError(result.error)
    } else if (result.data) {
      console.log("result", result.data)
      setSuccess(true)
      setMessage(type=="reset-password"?"password reset succesfully":"otp verified ")

      
      if (type === "signup" || !type) {
          useAuthStore.getState().setAuth(result.data.user)
          setTimeout(() => navigate("/", { replace: true }), 1500)
      } else if (type === "reset-password") {
          setTimeout(() => navigate("/login", { replace: true }), 1500)
      }
    }

    setLoading(false)
  }

  const title = type === "reset-password" ? "Verify Password Reset" : "Verify your Sign In"
  const description = type === "reset-password" 
    ? "Enter the verification code we sent to your email to complete your password reset."
    : "Enter the verification code we sent to your email address: "

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              {message}
            </div>
          )}
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
            <span className="font-medium">{email || "your email"}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResend} 
                disabled={!isResendEnabled}
              >
                <RefreshCwIcon className={`mr-1 h-3 w-3 ${!isResendEnabled ? 'animate-spin' : ''}`} />
                {isResendEnabled ? "Resend Code" : `Resend in ${formatTime(timer)}`}
              </Button>
            </div>
            <InputOTP
              maxLength={6}
              id="otp-verification"
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button
              type="submit"
              className="w-full"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {type === "reset-password" ? "Didn't receive the code?" : "Having trouble signing in?"}{" "}
              <a
                href="#"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
