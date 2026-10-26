// src/pages/LoginPage.jsx
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { AuthField } from "@/components/ui/auth/auth-field"
import { AuthLink } from "@/components/ui/auth/auth-link"
import { AuthSubmitButton } from "@/components/ui/auth/auth-submit-button"
import { BrandTitle } from "@/components/ui/auth/brand-title"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { login } from "@/services/authService"
import ProfileAvatar from "@/components/ui/profileavatar"

export default function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim() || !password) {
            setError("Email and password are required.")
            return
        }

        try {
            setLoading(true)
            await login(email.trim(), password)
            navigate("/dashboard")
        } catch (err) {
            const msg = err?.response?.data?.message ?? "Login failed. Please try again."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const PasswordToggle = (
        <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="pointer-events-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
    )

    return (
        <>
            <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center px-4">
                <Card className="w-full max-w-sm border border-neutral-800 bg-neutral-900 shadow-2xl">
                    <CardHeader className="pb-4 text-center">
                        <ProfileAvatar
                            mode="lookup"
                            email={email.trim()}
                            size={72}
                            className="mx-auto mb-3"
                            alt="Account profile picture"
                            showEditBadge={false}
                        />
                        <BrandTitle text="RentIT" className="text-base text-white" />
                        <p className="mt-1 text-sm text-neutral-400">Sign in to your account</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {error && (
                            <div role="alert" className="rounded-md bg-red-900/30 border border-red-800 px-3 py-2 text-xs text-red-400">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            <AuthField
                                id="login-email"
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

                            <div className="space-y-1">
                                <AuthField
                                    id="login-password"
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    endAdornment={PasswordToggle}
                                    inputClassName="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:border-blue-500"
                                    labelClassName="text-neutral-300"
                                />
                                <div className="flex justify-end pt-1">
                                    <AuthLink label="Forgot password?" onClick={() => navigate("/forgot-password")} className="text-xs text-blue-400 hover:text-blue-300" />
                                </div>
                            </div>

                            <AuthSubmitButton
                                label="Sign In"
                                loading={loading}
                                loadingText="Signing in…"
                                className="mt-2 w-full bg-white text-neutral-900 border-white hover:bg-neutral-100 uppercase tracking-widest"
                            />
                        </form>

                        <div className="flex items-center justify-center gap-1 pt-1">
                            <span className="text-sm text-neutral-500">Don't have an account?</span>
                            <AuthLink label="Sign up" onClick={() => navigate("/signup")} className="text-blue-400 hover:text-blue-300" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}