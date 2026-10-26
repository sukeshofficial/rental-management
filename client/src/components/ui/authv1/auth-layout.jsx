import * as React from "react"
import { BrandTitle } from "./brand-title"
import { HomeButton } from "./home-button"
import { AuthBrandPanel } from "./auth-brand-panel"
import { cn } from "@/lib/utils"

/**
 * AuthLayout (authv1)
 *
 * Master responsive split-screen container for Rental Management authentication flows.
 *
 * Props:
 *  - title            {string}    Form heading ("Welcome back", "Create your account")
 *  - subtitle         {string}    Form subheading ("Sign in to your account", ...)
 *  - children         {ReactNode} Form body and interactive controls
 *  - brandPanelProps  {object}    Props forwarded to AuthBrandPanel
 *  - homeHref         {string}    Destination for Home button. Default: "/"
 *  - className        {string}    Optional styling override for form wrapper
 */
const CURRENT_YEAR = new Date().getFullYear()

export function AuthLayout({
    title,
    subtitle,
    children,
    brandPanelProps,
    homeHref = "/",
    className,
}) {
    return (
        <div className="flex min-h-screen w-full bg-neutral-50 dark:bg-[#0B0F17] transition-colors duration-200">
            {/* Left Promotional Brand Panel (Desktop only) */}
            <AuthBrandPanel {...brandPanelProps} />

            {/* Right Authentication Area */}
            <main className="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
                {/* Top Navigation Bar */}
                <header className="flex w-full items-center justify-between">
                    {/* Brand visible on mobile/tablet when the left panel is hidden */}
                    <div className="lg:hidden">
                        <BrandTitle />
                    </div>
                    {/* Spacer for desktop alignment */}
                    <div className="hidden lg:block" aria-hidden="true" />

                    {/* Top-right Home CTA */}
                    <HomeButton href={homeHref} />
                </header>

                {/* Centered Form Area */}
                <div className="mx-auto flex w-full max-w-md flex-col justify-center py-8 sm:py-12">
                    {/* Header: Title & Subtitle */}
                    <div className="mb-8 space-y-1.5 text-left sm:text-left">
                        {title && (
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Form Body */}
                    <div className={cn("w-full", className)}>
                        {children}
                    </div>
                </div>

                {/* Bottom Footer Spacing / Micro-copyright */}
                <footer className="w-full text-center text-xs text-neutral-400 dark:text-neutral-600 py-2">
                    © {CURRENT_YEAR} Rental Management. All rights reserved.
                </footer>
            </main>
        </div>
    )
}

export default AuthLayout
