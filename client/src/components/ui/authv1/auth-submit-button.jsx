import * as React from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * AuthSubmitButton (authv1)
 *
 * Prominent pill-shaped primary action button with trailing arrow icon,
 * loading spinner, and theme-aware indigo/purple styling matching the mockup.
 *
 * Props:
 *  - label       {string}   Button text (e.g., "SIGN IN", "SIGN UP")
 *  - type        {string}   "submit" | "button" | "reset". Default: "submit"
 *  - onClick     {function} Optional click handler
 *  - disabled    {boolean}  Disabled state
 *  - loading     {boolean}  Loading state
 *  - loadingText {string}   Label shown while loading
 *  - showArrow   {boolean}  Controls trailing arrow icon. Default: true
 *  - className   {string}   Optional styling override
 */
export function AuthSubmitButton({
    label,
    type = "submit",
    onClick,
    disabled = false,
    loading = false,
    loadingText = "Please wait…",
    showArrow = true,
    className,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
            className={cn(
                "group relative inline-flex w-full items-center justify-center rounded-full",
                "bg-[#5B50EC] hover:bg-[#4E43E2] active:bg-[#4337D4]",
                "dark:bg-[#6366F1] dark:hover:bg-[#5254E8] dark:active:bg-[#4547DC]",
                "text-white font-semibold text-xs sm:text-sm uppercase tracking-wider",
                "h-11 sm:h-12 px-6 shadow-md shadow-indigo-500/20 dark:shadow-indigo-900/30",
                "transition-all duration-150 select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                className
            )}
        >
            {loading ? (
                <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>{loadingText}</span>
                </span>
            ) : (
                <span className="inline-flex items-center justify-center gap-2">
                    <span>{label}</span>
                    {showArrow && (
                        <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-1" />
                    )}
                </span>
            )}
        </button>
    )
}

export default AuthSubmitButton
