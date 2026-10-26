import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { AuthField } from "@/components/ui/auth/auth-field"
import { AuthLink } from "@/components/ui/auth/auth-link"
import { AuthSubmitButton } from "@/components/ui/auth/auth-submit-button"
import { BrandTitle } from "@/components/ui/auth/brand-title"
import { PasswordStrengthIndicator } from "@/components/ui/auth/password-strength-indicator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { signup } from "@/services/authService"
import ProfileAvatar from "@/components/ui/profileavatar"

export default function SignupPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatarFile, setAvatarFile] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [confirmError, setConfirmError] = useState("")

    const PasswordToggle = (
        <div className="pointer-events-none flex items-center">
            <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="pointer-events-auto flex items-center text-neutral-500 hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    )

    const ConfirmToggle = (
        <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="pointer-events-auto flex items-center text-neutral-500 hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            aria-label={showConfirm ? "Hide password" : "Show password"}
        >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setConfirmError("")

        if (!email.trim() || !password || !confirmPassword) {
            setError("All fields are required.")
            return
        }

        if (password !== confirmPassword) {
            setConfirmError("Passwords do not match.")
            return
        }

        try {
            setLoading(true)
            await signup(email.trim(), password, avatarFile)
            navigate("/dashboard")
        } catch (err) {
            console.error("❌ Signup failed:", err);
            console.error("HTTP status:", err?.response?.status);
            console.error("Backend response:", err?.response?.data);
            console.error("Error message:", err?.message);
            const msg = err?.response?.data?.message ?? "Registration failed. Please try again."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center px-4">
                <Card className="w-full max-w-sm border border-neutral-800 bg-neutral-900 shadow-2xl">
                    <CardHeader className="pb-4 text-center">
                        <ProfileAvatar
                            mode="upload"
                            file={avatarFile}
                            onFileChange={setAvatarFile}
                            size={88}
                            editable={true}
                            hoverEffect={true}
                            cameraHoverScale={1.3}
                            showEditBadge={true}
                            allowRemove={true}
                            onRemove={() => setAvatarFile(null)}
                            className="mb-4"
                        />
                        <BrandTitle text="RentIT" className="text-base text-white" />
                        <p className="mt-1 text-sm text-neutral-400">Create your account</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {error && (
                            <div role="alert" className="rounded-md bg-red-900/30 border border-red-800 px-3 py-2 text-xs text-red-400">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                            <AuthField
                                id="signup-email"
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                inputClassName="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:border-blue-500"
                                labelClassName="text-neutral-300"
                            />

                            <AuthField
                                id="signup-password"
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                                endAdornment={PasswordToggle}
                                inputClassName="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:border-blue-500"
                                labelClassName="text-neutral-300"
                            />

                            {password.length > 0 && (
                                <PasswordStrengthIndicator password={password} />
                            )}

                            <AuthField
                                id="signup-confirm-password"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirm ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setConfirmError("")
                                }}
                                autoComplete="new-password"
                                required
                                error={confirmError}
                                endAdornment={ConfirmToggle}
                                inputClassName="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:border-blue-500"
                                labelClassName="text-neutral-300"
                            />

                            <AuthSubmitButton
                                label="Create Account"
                                loading={loading}
                                loadingText="Creating account…"
                                className="mt-2 w-full bg-white text-neutral-900 border-white hover:bg-neutral-100 uppercase tracking-widest"
                            />
                        </form>

                        <div className="flex items-center justify-center gap-1 pt-1">
                            <span className="text-sm text-neutral-500">Already have an account?</span>
                            <AuthLink label="Log in" onClick={() => navigate("/login")} className="text-blue-400 hover:text-blue-300" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
