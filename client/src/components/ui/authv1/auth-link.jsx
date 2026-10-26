import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

/**
 * AuthLink (authv1)
 *
 * Semantic link or action button for switching authentication flows or recovering credentials.
 *
 * Props:
 *  - label     {string}    Displayed link text (e.g. "Register here", "Login")
 *  - href      {string}    Application route or URL
 *  - onClick   {function}  Optional click handler
 *  - prefix    {string}    Optional preceding text (e.g. "Don't have an account?")
 *  - className {string}    Optional styling override
 */
export function AuthLink({
    label,
    href,
    onClick,
    prefix,
    className,
}) {
    const linkClasses = cn(
        "font-medium text-indigo-600 dark:text-indigo-400",
        "hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-0.5",
        "transition-colors"
    )

    const linkContent = href ? (
        <Link to={href} onClick={onClick} className={linkClasses}>
            {label}
        </Link>
    ) : (
        <button
            type="button"
            onClick={onClick}
            className={cn(linkClasses, "bg-transparent p-0 border-0 cursor-pointer")}
        >
            {label}
        </button>
    )

    if (prefix) {
        return (
            <p className={cn("text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 text-center", className)}>
                {prefix}{" "}
                {linkContent}
            </p>
        )
    }

    return (
        <div className={cn("text-xs sm:text-sm text-center", className)}>
            {linkContent}
        </div>
    )
}

export default AuthLink
