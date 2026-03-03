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
import { useState } from "react"
import { apiService } from "@/service/apiService"
import useAuthStore from "@/store/store"
import { useLocation, useNavigate } from "react-router-dom"

export function InputOTPForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { email } = location.state || {}

  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  async function handleVerifyOtp() {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code")
      return
    }

    setLoading(true)
    setError("")

    const result = await apiService.verifyOtp(email, otp)

    if (result.error) {
      setError(result.error)
    } else if (result.data) {
        console.log("result", result.data)
      setSuccess(true)
      setMessage(result.data.message)
      useAuthStore.getState().setAuth(result.data.user)
      setTimeout(() => navigate("/", { replace: true }), 1500)
    }

    setLoading(false)
  }

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
          <CardTitle>Verify your Sign In</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium">{email || "your email"}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="mr-1 h-3 w-3" />
                Resend Code
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
              Having trouble signing in?{" "}
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
