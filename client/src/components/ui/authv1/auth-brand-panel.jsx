import * as React from "react"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import heroVilla from "@/assets/rental-hero-villa.jpg"

/**
 * AuthBrandPanel (authv1)
 *
 * Left promotional split-panel rendering the luxury architectural villa backdrop,
 * brand title, hero copywriting, and bottom tagline matching the design mockup.
 *
 * Props:
 *  - headline   {string}   Primary heading. Default: "Rent smarter.\nManage better."
 *  - subtitle   {string}   Supporting copy. Default: "A simpler way to manage rental properties and tenants."
 *  - tagline    {string}   Bottom quote. Default: "— Your rentals, organized."
 *  - imageSrc   {string}   Optional background image override
 *  - brandText  {string}   Brand name. Default: "Rental Management"
 *  - brandHref  {string}   Brand link. Default: "/"
 *  - className  {string}   Optional styling override
 */
export function AuthBrandPanel({
    headline = "Rent smarter.\nManage better.",
    subtitle = "A simpler way to manage rental properties and tenants.",
    tagline = "— Your rentals, organized.",
    imageSrc = heroVilla,
    brandText = "Rental Management",
    brandHref = "/",
    className,
}) {
    return (
        <aside
            className={cn(
                "relative hidden lg:flex flex-col justify-between w-1/2 p-8 lg:p-12 xl:p-16 text-white overflow-hidden select-none",
                className
            )}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${imageSrc})` }}
                aria-hidden="true"
            />

            {/* Dark Vignette & Gradient Overlays for optimal readability */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none"
                aria-hidden="true"
            />

            {/* Top Brand Header */}
            <div className="relative z-10 flex items-center gap-3">
                <Link
                    to={brandHref}
                    className="inline-flex items-center gap-2.5 rounded-lg p-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600/90 text-white shadow-sm shadow-indigo-900/40">
                        <Home className="size-4" strokeWidth={2.4} />
                    </div>
                    <span className="font-semibold text-lg tracking-tight text-white drop-shadow-sm">
                        {brandText}
                    </span>
                </Link>
            </div>

            {/* Center Editorial Copy */}
            <div className="relative z-10 my-auto max-w-lg space-y-4 py-12">
                <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md whitespace-pre-line">
                    {headline}
                </h1>
                <p className="text-base xl:text-lg text-neutral-200/90 leading-relaxed font-normal max-w-md drop-shadow">
                    {subtitle}
                </p>
            </div>

            {/* Bottom Tagline */}
            <div className="relative z-10">
                <p className="text-xs sm:text-sm font-medium tracking-wide text-neutral-300/80 drop-shadow">
                    {tagline}
                </p>
            </div>
        </aside>
    )
}

export default AuthBrandPanel
