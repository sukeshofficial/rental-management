import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

/**
 * HomeButton (authv1)
 *
 * Renders the compact oval/pill Home button in the upper corner of the form.
 *
 * Props:
 *  - label     {string}    Button text. Default: "Home"
 *  - href      {string}    Navigation destination. Default: "/"
 *  - onClick   {function}  Optional click handler
 *  - disabled  {boolean}   Disabled state
 *  - className {string}    Optional styling override
 */
export function HomeButton({
    label = "Home",
    href = "/",
    onClick,
    disabled = false,
    className,
}) {
    const baseClasses = cn(
        "inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700",
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
        "px-4 py-1 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300",
        "hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        "transition-all duration-150 shadow-sm",
        disabled && "opacity-50 pointer-events-none",
        className
    )

    if (href && !disabled) {
        return (
            <Link to={href} onClick={onClick} className={baseClasses}>
                {label}
            </Link>
        )
    }

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
        >
            {label}
        </button>
    )
}

export default HomeButton
