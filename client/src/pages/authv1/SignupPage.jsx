import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, User, Phone, Lock } from "lucide-react"
import {
    AuthLayout,
    AuthField,
    AuthSubmitButton,
    AuthLink,
    PasswordStrengthIndicator,
} from "@/components/ui/authv1"
import { register } from "@/services/authService"

/**
 * SignupPage (authv1)
 *
 * Dedicated registration page matching the split-screen reference design.
 * Features:
 *  - Your Email, Your Name, Your Phone
 *  - Password with live 4-segment strength meter
 *  - Confirm Password with visibility toggle
 *  - Prominent "SIGN UP →" CTA
 *  - Clean routing to login
 */
export default function SignupPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [confirmError, setConfirmError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setConfirmError("")

        if (!email.trim() || !name.trim() || !phone.trim() || !password || !confirmPassword) {
            setError("All fields are required to create an account.")
            return
        }

        if (password !== confirmPassword) {
            setConfirmError("Passwords do not match.")
            return
        }

        try {
            setLoading(true)
            await register({
                email: email.trim(),
                name: name.trim(),
                phone: phone.trim(),
                password,
                confirmPassword,
            })
            navigate("/dashboard")
        } catch (err) {
            const msg =
                err?.response?.data?.message ??
                err?.message ??
                "Registration failed. Please try again."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join the Rental Management platform"
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
                {/* Your Email */}
                <AuthField
                    id="signup-email"
                    name="email"
                    label="Your Email"
                    type="email"
                    placeholder="Enter your email"
                    startIcon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />

                {/* Your Name */}
                <AuthField
                    id="signup-name"
                    name="name"
                    label="Your Name"
                    type="text"
                    placeholder="e.g. John Doe"
                    startIcon={User}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                />

                {/* Your Phone */}
                <AuthField
                    id="signup-phone"
                    name="phone"
                    label="Your Phone"
                    type="tel"
                    placeholder="e.g. 9098980900"
                    startIcon={Phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                />

                {/* Password & Password Strength Meter */}
                <div className="space-y-1">
                    <AuthField
                        id="signup-password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        startIcon={Lock}
                        showPasswordToggle={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                    <PasswordStrengthIndicator password={password} showLabel={true} />
                </div>

                {/* Confirm Password */}
                <AuthField
                    id="signup-confirm-password"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    startIcon={Lock}
                    showPasswordToggle={true}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    error={confirmError}
                    required
                />

                {/* Primary Sign Up CTA */}
                <div className="pt-2">
                    <AuthSubmitButton
                        label="SIGN UP"
                        loading={loading}
                        loadingText="Creating account…"
                        showArrow={true}
                    />
                </div>

                {/* Link to Login */}
                <div className="pt-4">
                    <AuthLink
                        prefix="Already have an account?"
                        label="Login"
                        href="/auth/login"
                    />
                </div>
            </form>
        </AuthLayout>
    )
}
