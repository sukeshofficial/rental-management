import * as React from "react"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

/**
 * BrandTitle (authv1)
 *
 * Renders the product logo and name with a distinctive purple home icon
 * and clean typography matching the authentication design reference.
 *
 * Props:
 *  - text       {string}   Brand name. Default: "Rental Management"
 *  - href       {string}   Destination link. Default: "/"
 *  - showIcon   {boolean}  Controls icon visibility. Default: true
 *  - icon       {ReactNode} Custom icon component. Default: Lucide Home
 *  - className  {string}   Optional styling override.
 */
export function BrandTitle({
    text = "Rental Management",
    href = "/",
    showIcon = true,
    icon: IconComponent = Home,
    className,
}) {
    const content = (
        <div className={cn("inline-flex items-center gap-2 select-none group", className)}>
            {showIcon && (
                <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <IconComponent className="size-4" strokeWidth={2.2} />
                </div>
            )}
            <span className="font-semibold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-white">
                {text}
            </span>
        </div>
    )

    if (href) {
        return (
            <Link
                to={href}
                className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-0.5 transition-opacity hover:opacity-90"
            >
                {content}
            </Link>
        )
    }

    return content
}

export default BrandTitle
