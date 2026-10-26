import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Calculates password strength based on standard rules:
 * - Length >= 8
 * - Uppercase letter
 * - Number
 * - Special character
 */
function evaluateStrength(password) {
    if (!password) {
        return { level: "empty", label: "Empty", score: 0, color: "bg-neutral-300 dark:bg-neutral-700" }
    }

    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) {
        return { level: "weak", label: "Weak", score: 1, color: "bg-rose-500", textColor: "text-rose-500" }
    }
    if (score === 2) {
        return { level: "fair", label: "Fair", score: 2, color: "bg-amber-500", textColor: "text-amber-500" }
    }
    if (score === 3) {
        return { level: "good", label: "Good", score: 3, color: "bg-indigo-500", textColor: "text-indigo-500" }
    }
    return { level: "strong", label: "Strong", score: 4, color: "bg-emerald-500", textColor: "text-emerald-500" }
}

/**
 * PasswordStrengthIndicator (authv1)
 *
 * Renders the compact 4-segment horizontal meter and live text indicator
 * matching the Sign Up screen in the reference mockup.
 *
 * Props:
 *  - password  {string}  Password string to evaluate
 *  - strength  {string}  Direct strength override ("weak"|"fair"|"good"|"strong")
 *  - showLabel {boolean} Whether to show the text label. Default: true
 *  - className {string}  Optional styling override
 */
export function PasswordStrengthIndicator({
    password = "",
    strength: directStrength,
    showLabel = true,
    className,
}) {
    // If a direct strength prop is provided, map it to equivalent score
    let evaluation
    if (directStrength) {
        const map = {
            empty: { level: "empty", label: "Empty", score: 0, color: "bg-neutral-300 dark:bg-neutral-700" },
            weak: { level: "weak", label: "Weak", score: 1, color: "bg-rose-500", textColor: "text-rose-500" },
            fair: { level: "fair", label: "Fair", score: 2, color: "bg-amber-500", textColor: "text-amber-500" },
            good: { level: "good", label: "Good", score: 3, color: "bg-indigo-500", textColor: "text-indigo-500" },
            strong: { level: "strong", label: "Strong", score: 4, color: "bg-emerald-500", textColor: "text-emerald-500" },
        }
        evaluation = map[directStrength.toLowerCase()] || map.weak
    } else {
        evaluation = evaluateStrength(password)
    }

    if (!password && !directStrength) {
        return null
    }

    return (
        <div
            className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1", className)}
            aria-live="polite"
        >
            {/* 4-Segment Horizontal Bar */}
            <div className="flex items-center gap-1.5 flex-1 max-w-[180px]">
                {[0, 1, 2, 3].map((index) => {
                    const isActive = index < evaluation.score
                    return (
                        <div
                            key={index}
                            className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-200",
                                isActive
                                    ? evaluation.color
                                    : "bg-neutral-200 dark:bg-neutral-800"
                            )}
                        />
                    )
                })}
            </div>

            {/* Label */}
            {showLabel && (
                <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Password strength:{" "}
                    <span className={cn("font-semibold", evaluation.textColor)}>
                        {evaluation.label}
                    </span>
                </div>
            )}
        </div>
    )
}

export default PasswordStrengthIndicator
