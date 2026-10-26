import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import {
    AuthLayout,
    AuthField,
    AuthSubmitButton,
    AuthLink,
} from "@/components/ui/authv1"
import { login } from "@/services/authService"

/**
 * LoginPage (authv1)
 *
 * Dedicated login page matching the split-screen reference design.
 * Features luxury villa promotional panel, high-contrast form surface,
 * Mail and Lock leading icons, and theme-aware styling.
 */
export default function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            const msg =
                err?.response?.data?.message ??
                err?.message ??
                "Invalid credentials. Please try again."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account"
            homeHref="/"
        >
            {error && (
                <div
                    role="alert"
                    className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400"
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email Field */}
                <AuthField
                    id="login-email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    startIcon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />

                {/* Password Field */}
                <AuthField
                    id="login-password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    startIcon={Lock}
                    showPasswordToggle={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                {/* Primary Sign In CTA */}
                <div className="pt-2">
                    <AuthSubmitButton
                        label="SIGN IN"
                        loading={loading}
                        loadingText="Signing in…"
                        showArrow={true}
                    />
                </div>

                {/* Account Navigation Links */}
                <div className="space-y-2 pt-4">
                    <AuthLink
                        prefix="Don't have an account?"
                        label="Register here"
                        href="/auth/signup"
                    />

                    <AuthLink
                        label="Forgot username / password"
                        onClick={() => {
                            alert("Please contact your administrator to reset your credentials.")
                        }}
                    />
                </div>
            </form>
        </AuthLayout>
    )
}
